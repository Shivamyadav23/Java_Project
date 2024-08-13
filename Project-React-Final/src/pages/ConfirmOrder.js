import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../assets/Extra Images/VitaLogo.png'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ConfirmOrder = () => {
  const [userData, setUserData] = useState(null);
  const [invoiceData, setInvoiceData] = useState({});
  const invoiceRef = useRef(null);

  const userId = sessionStorage.getItem('userid');
  const myOrder = JSON.parse(sessionStorage.getItem('myOrder')) || [];
  const basePrice = JSON.parse(sessionStorage.getItem('myPrice')) || '0.00';
  const myQuantity = JSON.parse(sessionStorage.getItem('myQuantity')) || 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/userForInvoice/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));

    setInvoiceData({
      invoiceDate: new Date().toLocaleDateString(),
      invoiceNumber: 'X9AT6-240' + (myQuantity || 'N/A'),
      orderedQty: myQuantity,
    });
  }, [userId, myQuantity]);

  const basePriceTotal = parseFloat(basePrice) * myQuantity;
  const selectedItemsTotal = myOrder.reduce((total, item) => total + parseFloat(item.price) * myQuantity, 0);
  const totalWithoutGST = basePriceTotal + selectedItemsTotal;
  const gstRate = 0.28;
  const gstAmount = totalWithoutGST * gstRate;
  const totalWithGST = totalWithoutGST + gstAmount;

  const handleDownload = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 15, 10, 180, 160);
      const time = new Date().getHours() + '' + new Date().getMinutes() + new Date().getSeconds();
      const pdfName = 'invoice' + userId + time;
      const abspdfpath="C:/Users/Lenovo/Downloads/"+pdfName+".pdf";
      pdf.save(pdfName);
      console.log(abspdfpath);
      console.log(pdfName);
      setTimeout(() => {
        fetch('http://localhost:8080/api/email/mailInvoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sendTo: userData?.email,
            path: abspdfpath,
          }),
        })
        .then(response => response.json())
        .then(data => console.log('Email sent:', data))
        .catch(error => console.error('Error sending email:', error));
      }, 2000);
    });
  };

  return (
    <Container fluid>
      <div style={containerStyle} ref={invoiceRef}>
        <Row className="mb-4">
          <Col className="text-center">
            <img src={logo} alt="Logo" style={logoStyle} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="text-center">
            <div style={bannerStyle}>Invoice</div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>User ID:</strong></td>
                  <td>{userId}</td>
                </tr>
                <tr>
                  <td><strong>Invoice Date:</strong></td>
                  <td>{invoiceData?.invoiceDate || new Date().toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>Invoice Number:</strong></td>
                  <td>{invoiceData?.invoiceNumber || 'X9AT6-240' + invoiceData?.orderedQty || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Car Quantity:</strong></td>
                  <td>{invoiceData?.orderedQty || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col md={6}>
            {userData && (
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Username:</strong></td>
                    <td>{userData.username}</td>
                  </tr>
                  <tr>
                    <td><strong>Company Name:</strong></td>
                    <td>{userData.company_name}</td>
                  </tr>
                  <tr>
                    <td><strong>GST Number:</strong></td>
                    <td>{userData.gst_number}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>{userData.address_line1}, {userData.address_line2}, {userData.city}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Telephone:</strong></td>
                    <td>{userData.telephone}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Col>
        </Row>
<hr></hr>
        <Row className="mb-4">
          <Col>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(myOrder) && myOrder.length > 0 ? (
                  myOrder.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{myQuantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No items found</td>
                  </tr>
                )}
                <tr>
                  <td>Base Price</td>
                  <td>₹{basePrice}</td>
                  <td>{myQuantity}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td colSpan="2">₹{totalWithoutGST.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>GST (28%)</td>
                  <td colSpan="2">₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Net Payable Amount</strong></td>
                  <td colSpan="2"><strong>₹{totalWithGST.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>

      </div>

      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="secondary" onClick={handleDownload}>Download and Email PDF</Button>
        </Col>
      </Row>
    </Container>
  );
};

// Styles similar to InvoicePage
const containerStyle = {
  padding: '20px',
  width: '80%',
  maxWidth: '1000px',
  border: '1px solid black',
  backgroundColor: '#fff',
  margin: 'auto',
};

const logoStyle = {
  width: '150px',
};

const bannerStyle = {
  fontSize: '25px',
  fontWeight: 'bold',
  padding: '10px',
  backgroundColor: '#f0f0f0',
  border: '1px solid black',
  textAlign: 'center',
  marginBottom: '20px',
};

export default ConfirmOrder;