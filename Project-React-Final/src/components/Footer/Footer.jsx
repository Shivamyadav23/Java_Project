import React from 'react';
import { Container, Row, Col,  Nav } from 'react-bootstrap';


const Footer = () => {
 


  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem 0',
        borderTop: '1px solid #dee2e6',
      }}
    >
      <Container>
        <Row>
          <Col md={3} className="text-center text-md-left mb-4 mb-md-0">
            <h5 style={{ fontWeight: '700', color: '#1c2859' }}>Address</h5>
            <p style={{ color: '#6c757d' }}>
              SM VITA, Gulmohar Road, MHADA Colony, Vile Parle West, Mumbai, Maharashtra 400049
            </p>
            <p style={{ color: '#6c757d' }}>training@vidyanidhi.com</p>
          </Col>
          <Col md={3} className="text-center text-md-left mb-4 mb-md-0">
            <h5 style={{ fontWeight: '700', color: '#1c2859' }}>Our Services</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" style={{ color: '#6c757d' }}>Configure</Nav.Link>
              <Nav.Link href="#" style={{ color: '#6c757d' }}>Bulk Purchase</Nav.Link>
              <Nav.Link href="#" style={{ color: '#6c757d' }}>Collab</Nav.Link>
            </Nav>
          </Col>
          <Col md={3} className="text-center text-md-left mb-4 mb-md-0">
            <h5 style={{ fontWeight: '700', color: '#1c2859' }}>Our Company</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" style={{ color: '#6c757d' }}>Reporting</Nav.Link>
              <Nav.Link href="#" style={{ color: '#6c757d' }}>Get in Touch</Nav.Link>
              <Nav.Link href="#" style={{ color: '#6c757d' }}>Management</Nav.Link>
            </Nav>
          </Col>
          <Col md={3} className="text-center text-md-left">
            <h5 style={{ fontWeight: '700', color: '#1c2859' }}>V-Config</h5>
            <Nav className="d-flex justify-content-center">
              <Nav.Link href="#" style={{ color: '#6c757d' }}><i className="bi bi-facebook"></i></Nav.Link>
              <Nav.Link href="#" style={{ color: '#6c757d' }}><i className="bi bi-instagram"></i></Nav.Link>
            </Nav>
            <p style={{ color: '#6c757d', marginTop: '1rem' }}>
              &copy; 2024 V-Config Inc.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
