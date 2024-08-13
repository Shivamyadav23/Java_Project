import React, { useState } from 'react';
import {  
    Container,
    Row,
    Col,
    Button,
    Form,
    Alert
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log({
            companyName: formData.get('companyName'),
            enquiry: formData.get('enquiry'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
        });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/home');
        }, 3000); // Alert will disappear after 3 seconds
    };

    return (
        <Container fluid style={{ padding: '2rem 1rem' }}>
            <Row className="justify-content-center">
                <Col lg={6} md={8} className="d-flex align-items-center">
                    <Form noValidate onSubmit={handleSubmit} style={{ width: '100%', padding: '1rem' }}>
                        <h1 className="text-center mb-4">Interested in Buying a Vehicle?</h1>
                        <p className="text-center mb-4">
                            If you are interested in buying a vehicle, please contact us. We will call you shortly to fulfill your requirements and assist with your vehicle needs.
                        </p>
                        <Form.Group controlId="companyName" className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control 
                                type="text"
                                name="companyName"
                                placeholder="Enter Company Name"
                                required 
                                style={{ padding: '0.5rem' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="enquiry" className="mb-3">
                            <Form.Label>Enquiry</Form.Label>
                            <Form.Control 
                                as="textarea"
                                name="enquiry"
                                placeholder="Enter Enquiry"
                                rows={3}
                                required 
                                style={{ padding: '0.5rem', resize: 'none' }}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                placeholder="Enter Email Address"
                                required 
                                style={{ padding: '0.5rem' }}
                            />
                        </Form.Group>
                        
                        <Button 
                            variant="primary" // Updated button color to blue
                            type="submit"
                            className="w-100"
                        >
                            Send
                        </Button>
                    </Form>
                </Col>
                <Col lg={6} className="d-none d-lg-block">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9082367988526!2d72.83031607466607!3d19.111681150852473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c3a5e26d7b%3A0x89a89f343cff9c29!2sSM%20VITA!5e0!3m2!1sen!2sin!4v1722767458604!5m2!1sen!2sin" 
                        title="Location Map"
                        style={{ border: 0, width: '100%', height: '400px' }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </Col>
            </Row>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible style={{ position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1050, transition: 'opacity 0.5s ease' }}>
                    <Alert.Heading>Query Submitted Successfully</Alert.Heading>
                </Alert>
            )}
        </Container>
    );
};

export default Contact;
