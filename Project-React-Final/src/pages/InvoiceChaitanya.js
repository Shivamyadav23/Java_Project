import React, { useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import logo from '../assets/Extra Images/VitaLogo.png';

const Invoice = () => {
  const invoiceRef = useRef();

  const handlePrint = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 15, 10, 180,160);
      pdf.save('invoice.pdf');
    });
  };

  const containerStyle = {
    padding: '20px',
    width: '1000px',
    border: '1px solid black',
    position: 'relative',
    backgroundColor: '#fff',
    margin: 'auto'
  };

  const logoStyle = {
    width: '150px',
  };

  const bannerStyle = {
    fontSize: '25px',
    fontWeight: 'bold', // Makes the font bold
    padding: '10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid black',
    textAlign: 'center',
    marginBottom: '20px',
  };
  

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };

  const thStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid black',
    padding: '8px',
  };

  return (
    <Container fluid>
      <div ref={invoiceRef} style={containerStyle}>
        <Row className="mb-4">
          <Col className="text-center">
          <img src={logo } alt="Logo" style={logoStyle} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="text-center">
            <div style={bannerStyle}>Invoice</div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <p><strong>Customer Name:</strong> John Doe</p>
            <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
            <p><strong>Invoice Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Invoice Number:</strong> INV-123456</p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Item</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Quantity</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>Item 1</td>
                  <td style={tdStyle}>Description of item 1</td>
                  <td style={tdStyle}>1</td>
                  <td style={tdStyle}>$100.00</td>
                  <td style={tdStyle}>$100.00</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Item 2</td>
                  <td style={tdStyle}>Description of item 2</td>
                  <td style={tdStyle}>2</td>
                  <td style={tdStyle}>$50.00</td>
                  <td style={tdStyle}>$100.00</td>
                </tr>
                <tr>
                  <td colSpan="4" style={tdStyle}>Total</td>
                  <td style={tdStyle}>$200.00</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
      <Button 
        variant="primary" 
        onClick={handlePrint}
        style={{ margin: '20px' }}
      >
        Print PDF
      </Button>
    </Container>
  );
};

export default Invoice;
