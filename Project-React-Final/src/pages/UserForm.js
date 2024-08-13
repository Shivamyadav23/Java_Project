import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bg001 from '../assets/Login Page Images/log.jpg';
import '../CSS/UserForm.css'; // Import the CSS file

const UserForm = () => {
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        pinCode: '',
        state: '',
        telephone: '',
        gstNumber: ''
    });
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Create JSON data from form fields
            const data = {
                name: formData.name,
                address_line1: formData.addressLine1,
                address_line2: formData.addressLine2,
                city: formData.city,
                company_name: formData.companyName,
                email: formData.email,
                gst_number: formData.gstNumber,
                password: formData.password,
                pin_code: formData.pinCode,
                state: formData.state,
                telephone: formData.telephone,
            };

            try {
                // Post data to the backend
                const response = await fetch('http://localhost:8080/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    setShowAlert(true);

                    // Call the email sign-up API after a delay of 2 seconds
                    setTimeout(async () => {
                        try {
                            const emailResponse = await fetch('http://localhost:8080/api/email/onSignUp', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ sendTo: formData.email })
                            });

                            if (emailResponse.ok) {
                                console.log('Email sign-up successful');
                            } else {
                                console.error('Email sign-up failed');
                            }

                            navigate('/AccountCreatedResponse');
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }, 2000);
                } else {
                    // Handle errors
                    console.error('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setValidated(true);
    };

    // Handle form reset
    const handleReset = () => {
        setValidated(false);
        setShowAlert(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            companyName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            pinCode: '',
            state: '',
            telephone: '',
            gstNumber: ''
        });
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <Container fluid className="container-fluid-custom" style={{ backgroundImage: `url(${bg001})` }}>
            <Row className="justify-content-center">
                <Col md={8} lg={6} className="mb-4">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-custom">
                        <h2 className="text-center mb-4">User Registration</h2>
                        {/* Top Section: Name, Email, Password, and Confirm Password */}
                        <Row className="mb-4">
                            <Col md={12}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter name" 
                                        required 
                                        className="form-control-custom"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={12}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        required 
                                        className="form-control-custom"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter password" 
                                        required 
                                        className="form-control-custom"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm password" 
                                        required 
                                        className="form-control-custom"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password confirmation is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Main Section: Other Fields */}
                        <Row className="mb-4">
                            <Col md={6} style={{ paddingRight: '0.5rem' }}>
                                <Form.Group controlId="formCompanyName" className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter company name" 
                                        required 
                                        className="form-control-custom"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAddressLine1" className="mb-3">
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter address line 1" 
                                        required 
                                        className="form-control-custom"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCity" className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter city" 
                                        required 
                                        className="form-control-custom"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPinCode" className="mb-3">
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter pin code" 
                                        required 
                                        className="form-control-custom"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} style={{ paddingLeft: '0.5rem' }}>
                                <Form.Group controlId="formAddressLine2" className="mb-3">
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter address line 2" 
                                        className="form-control-custom"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formState" className="mb-3">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter state" 
                                        required 
                                        className="form-control-custom"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTelephone" className="mb-3">
                                    <Form.Label>Telephone</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter telephone" 
                                        required 
                                        className="form-control-custom"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGstNumber" className="mb-3">
                                    <Form.Label>GST Number</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter GST number" 
                                        required 
                                        className="form-control-custom"
                                        name="gstNumber"
                                        value={formData.gstNumber}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" variant="primary" className="me-2">Register</Button>
                            <Button type="reset" variant="secondary" className="ms-2" onClick={handleReset}>Reset</Button>
                        </div>
                    </Form>
                    <Alert show={showAlert} variant="success" className="mt-3" style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '300px' }}>
                        Registration Successful!
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default UserForm;
