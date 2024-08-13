import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/DropDownPage.css'; // Import the CSS file if needed

const DropdownPage = () => {
    const navigate = useNavigate();
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [minQty, setMinQty] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [segments, setSegments] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState([]);
    const [myModelId, setMyModelId] = useState(null); // New state for myModelId


    const token =localStorage.getItem('token')
    useEffect(() =>{
        if(!token){
          
            navigate('/login');
            //alert("Login first"); 
        }
        
    }, [])
    useEffect(() => {
        // Fetch segments from API
        fetch('http://localhost:8080/api/segments/')
            .then(response => response.json())
            .then(data => {
                setSegments(data);
            })
            .catch(error => console.error('Error fetching segments:', error));
    }, [token]);

    useEffect(() => {
        if (selectedSegment) {
            // Fetch manufacturers based on selected segment
            fetch(`http://localhost:8080/api/manufacturers/${selectedSegment.id}`)
                .then(response => response.json())
                .then(data => {
                    setManufacturers(data);
                })
                .catch(error => console.error('Error fetching manufacturers:', error));
        }
    }, [selectedSegment]);

    useEffect(() => {
        if (selectedManufacturer) {
            // Fetch models based on selected manufacturer
            fetch(`http://localhost:8080/api/models/${selectedSegment.id}/${selectedManufacturer.id}`)
                .then(response => response.json())
                .then(data => {
                    setModels(data);
                })
                .catch(error => console.error('Error fetching models:', error));
        }
    }, [selectedManufacturer]);

    // UseEffect to log formData when it changes
  useEffect(() => {
    console.log('Form Data:', formData);
  }, [formData]);

    const handleSegmentSelect = (segment) => {
        setSelectedSegment(segment);
        setSelectedManufacturer(null);
        setSelectedModel(null);
        setMinQty(null);
        setQuantity('');
        setManufacturers([]);
        setModels([]);
        console.log('Selected Segment:', segment); // Print selected segment
    };

    const handleManufacturerSelect = (manufacturer) => {
        setSelectedManufacturer(manufacturer);
        setSelectedModel(null);
        setMinQty(null);
        setQuantity('');
        setModels([]);
        console.log('Selected Manufacturer:', manufacturer); // Print selected manufacturer
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setMinQty(model.minQty); // Update minQty based on the selected model
        setQuantity(''); // Clear quantity when model is selected
        setMyModelId(model.id); // Set myModelId based on the selected model
        console.log('Selected Model ID:', model.id); // Print the model ID to the console
    };

    const handleNextButtonClick = () => {
        if (quantity < minQty) {
            alert(`Quantity should be greater than or equal to ${minQty}`);
            return;
        }

        const data = {
            segment: selectedSegment,
            manufacturer: selectedManufacturer,
            model: selectedModel,
            quantity: quantity
          };
      
          // Update formData state
          setFormData(prevData => [...prevData, data]);
      
          // Log data before navigation
          console.log('Data:', data);

        // Navigate to the Configure1 page with the selected model ID and quantity
        navigate('/configure1', { state: { modelId: myModelId, quantity: quantity } });
    };

    return (
        <Container 
            fluid 
            style={{
                padding: '2rem 4rem',
                backgroundColor: '#f0f0f0'
            }}
        >
            <Row className="justify-content-center">
                <Col lg={6} md={8} style={{
                    backgroundColor: '#fff',
                    borderRadius: '0',
                    padding: '1.5rem'
                }}>
                    <Form>
                        <Form.Group controlId="segmentDropdown" className="mb-4">
                            <Form.Control 
                                as="select" 
                                value={selectedSegment ? selectedSegment.id : ''}
                                onChange={(e) => {
                                    const segment = segments.find(s => s.id === parseInt(e.target.value));
                                    handleSegmentSelect(segment);
                                }}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    backgroundColor: '#e7f0ff' // Blue color for dropdowns
                                }}
                            >
                                <option value="">Select Segment</option>
                                {segments.map(segment => (
                                    <option key={segment.id} value={segment.id}>
                                        {segment.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="manufacturerDropdown" className="mb-4">
                            <Form.Control 
                                as="select" 
                                value={selectedManufacturer ? selectedManufacturer.id : ''}
                                onChange={(e) => {
                                    const manufacturer = manufacturers.find(m => m.id === parseInt(e.target.value));
                                    handleManufacturerSelect(manufacturer);
                                }}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    backgroundColor: '#e7f0ff' // Blue color for dropdowns
                                }}
                                disabled={!selectedSegment}
                            >
                                <option value="">Select Manufacturer</option>
                                {manufacturers.map(manufacturer => (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="modelDropdown" className="mb-4">
                            <Form.Control 
                                as="select" 
                                value={selectedModel ? selectedModel.id : ''}
                                onChange={(e) => {
                                    const model = models.find(m => m.id === parseInt(e.target.value));
                                    handleModelSelect(model);
                                }}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    backgroundColor: '#e7f0ff' // Blue color for dropdowns
                                }}
                                disabled={!selectedManufacturer}
                            >
                                <option value="">Select Model</option>
                                {models.map(model => (
                                    <option key={model.id} value={model.id}>
                                        {model.modName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="quantityInput" className="mb-4">
                            <Form.Control 
                                type="number" 
                                placeholder={minQty ? `Enter quantity (min ${minQty})` : "Enter quantity"}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }}
                                disabled={!selectedModel}
                            />
                        </Form.Group>

                        <Button 
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#28a745',
                                border: 'none',
                                color: '#fff',
                                textAlign: 'center',
                                borderRadius: '4px',
                                marginTop: '1rem',
                                fontSize: '16px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={handleNextButtonClick} // Handle button click
                        >
                            <span style={{
                                marginRight: '8px'
                            }}>Go</span>
                            <span style={{
                                marginLeft: '8px',
                                fontSize: '18px'
                            }}>→</span> {/* Right arrow text */}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default DropdownPage;
