import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/Extra Images/VitaLogo.png';

const InvoicePage = () => {
  const invoiceRef = useRef();
  const location = useLocation();
  const { invoiceData } = location.state || {};

  // State to store user data
  const [userData, setUserData] = useState(null);

  // Retrieve userId from session storage
  const userId = sessionStorage.getItem('userid');

  // Fetch user data from API on page load
  useEffect(() => {
    fetch(`http://localhost:8080/api/user/userForInvoice/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handlePrint = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 15, 10, 180, 160);
      //const date = new Date().toLocaleDateString();
      const time = new Date().getHours() + '' + new Date().getMinutes() + new Date().getSeconds();
      const pdfName = 'invoice' + userId + time;
      const abspdfpath="C:/Users/Lenovo/Downloads/"+pdfName+".pdf";
      pdf.save(pdfName);
      console.log(abspdfpath);
      console.log(pdfName);

//
// Delay API call by 5 seconds
setTimeout(() => {
  // API call to send the email with the invoice
  fetch('http://localhost:8080/api/email/mailInvoice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sendTo: userData?.email,
      path: abspdfpath // Send the PDF name or URL if your server can handle it
    }),
  })
  .then(response => response.json())
  .then(data => console.log('Email sent:', data))
  .catch(error => console.error('Error sending email:', error));
}, 2000); 

 });
    
  };

  const containerStyle = {
    padding: '20px',
    width: '1000px',
    border: '1px solid black',
    position: 'relative',
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

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    border: '1px solid black',
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#f9f9f9',
  };

  const buttonContainerStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <Container fluid>
      <div ref={invoiceRef} style={containerStyle}>
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
          <Col>
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Invoice Date:</strong> {invoiceData?.invoiceDate || new Date().toLocaleDateString()}</p>
            <p><strong>Invoice Number:</strong> {invoiceData?.invoiceNumber || 'SWFT-240'+invoiceData?.orderedQty || 'N/A'}</p>
            <p><strong>Quantity:</strong> {invoiceData?.orderedQty || 'N/A'}</p>
            {/* Display additional user info */}
            {userData && (
              <>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Company Name:</strong> {userData.company_name}</p>
                <p><strong>GST Number:</strong> {userData.gst_number}</p>
                <p><strong>Address: </strong> {userData.address_line1} ,{userData.address_line2} ,{userData.city}</p>
              </>
            )}
          </Col>
          <hr></hr>
        </Row>
        <div style={{paddingBottom: '20px', marginTop: '10px', fontWeight: 'bold', fontSize: '20px' }}>
          Components:
        </div>
        <Row className="mb-4">
          <Col>
            <ul style={listStyle}>
              {invoiceData?.components?.map((component, index) => (
                <li key={index} style={listItemStyle}>
                  {component.name}
                </li>
              ))}
            </ul>
            <div style={{ borderTop: '1px solid black', paddingTop: '10px', marginTop: '10px', fontWeight: 'bold' }}>
              Basic Amount: ₹ {invoiceData?.totalPrice || '0.00'}<br></br>
              Tax: ₹ {((invoiceData?.totalPrice) * 1.28) - invoiceData?.totalPrice || '0.00'}<br></br>
              Total: ₹{(invoiceData?.totalPrice * 1.28) || '0.00'} <br></br>
              <small style={{color: 'red'}}>*Including 28% GST on basic amount of ₹{invoiceData?.totalPrice}</small>
            </div>
          </Col>
        </Row>
        
      </div>
      <div style={buttonContainerStyle}>
          <Button variant="primary" onClick={handlePrint}>
            Download & Email Invoice
          </Button>
        </div>
    </Container>
  );
};

export default InvoicePage;