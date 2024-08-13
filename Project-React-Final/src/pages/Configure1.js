import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const Configure1 = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [components, setComponents] = useState([]);
  const [componentsLoading, setComponentsLoading] = useState(true);
  const [componentsError, setComponentsError] = useState(null);
  const [priceData, setPriceData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const modelId = location.state?.modelId;
  const quantity = location.state?.quantity;

  useEffect(() => {
    if (modelId && quantity) {
      console.log('Model ID from DropdownPage:', modelId);
      console.log('Quantity from DropdownPage:', quantity);
    }
  }, [modelId, quantity]);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/${modelId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarData(data);
      } catch (err) {
        setError('Error fetching car data');
      } finally {
        setLoading(false);
      }
    };

    if (modelId) {
      fetchCarData();
    }
  }, [modelId]);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/models/details/${modelId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPriceData(data.price);
      } catch (err) {
        setError('Error fetching price data');
      }
    };

    if (modelId) {
      fetchPriceData();
    }
  }, [modelId]);

  const fetchItems = async (category) => {
    let urls = [];
    if (category === 'S') {
      urls = [
       `http://localhost:8080/api/vehicles/S/${modelId}`,
        `http://localhost:8080/api/vehicles/I/${modelId}`,
        `http://localhost:8080/api/vehicles/E/${modelId}`
      ];
    } else {
      urls = [`http://localhost:8080/api/vehicles/${category}/${modelId}`];
    }

    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      const combinedData = data.flat();
      setComponents(combinedData);
    } catch (err) {
      setComponentsError('Error fetching components');
    } finally {
      setComponentsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems('S');
  }, [modelId]);

  const buttonStyle = {
    margin: '0 5px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px',
  };

  const containerStyle = {
    marginTop: '20px',
  };

  const boxStyle = {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    marginBottom: '15px',
  };

  const priceBoxStyle = {
    marginTop: '30px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#e7f0f0',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '16px',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '600px', // Increased size for better space utilization
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    marginBottom: '15px',
  };

  const componentTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '15px',
  };

  const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
  };

  const tableRowStyle = {
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const alternateRowStyle = {
    backgroundColor: '#e9ecef',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  };

  const token =localStorage.getItem('token')
    useEffect(() =>{
        if(!token){
          
            navigate('/login');
          //  alert("Login first"); 
        }
        
    },[] )

  const handleConfirmOrder = () => {
    const invoiceData = {
      userId: parseInt(sessionStorage.getItem('userid')), // Retrieve user ID from session storage
      modelId,
      orderedQty: quantity,
      components: components.map(c => ({ name: c.comp_name, price: c.comp_price })), // Collect component names and prices
      modelPrice: priceData,
      totalPrice: Math.round((priceData * quantity) ) // Calculate total price including GST
    };
  
    // Navigate to InvoicePage and pass invoiceData
    navigate('/invoicePage', { state: { invoiceData } });
  };
  

  return (
    <Container style={containerStyle}>
      <Row>
        <Col md={4}>
          <div>
            <h5 style={titleStyle}>Standard Components</h5>
            <div style={boxStyle}>
              {componentsLoading ? (
                <p>Loading components...</p>
              ) : componentsError ? (
                <p>{componentsError}</p>
              ) : components.length > 0 ? (
                <Table style={componentTableStyle}>
                  <thead style={tableHeaderStyle}>
                    <tr>
                      <th>Component Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((component, index) => (
                      <tr
                        key={component.comp_id}
                        style={index % 2 === 0 ? tableRowStyle : alternateRowStyle}
                      >
                        <td>{component.comp_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No components available</p>
              )}
            </div>
          </div>
        </Col>
        <Col md={8}>
          {carData ? (
            <img 
              src={`${process.env.PUBLIC_URL}${carData.path}`} // Ensure this path is correct
              alt={carData.carName} 
              style={imageStyle} 
            />
          ) : (
            <p>No image available</p>
          )}
          {priceData && quantity && (
            <div style={priceBoxStyle}>
              Using Standard Default Configuration Base Price: ₹{priceData} x {quantity} = ₹{priceData * quantity}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h5 style={titleStyle}>Description</h5>
            <div style={boxStyle}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : carData ? (
                <p>{carData.description}</p>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Button 
            style={buttonStyle} 
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </Button>
          <Button 
            style={buttonStyle} 
            onClick={() => navigate('/configure2', { state: { modelId, quantity, price: priceData } })}
          >
            Configure
          </Button>
          <Button 
            style={buttonStyle} 
            onClick={() => navigate('/dropdownPage', { state: { modelId } })}
          >
            Modify
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Configure1;