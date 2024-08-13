import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Configure2 = () => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('S');
  const [items, setItems] = useState([]);
  const [accessoryOptions, setAccessoryOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { modelId, quantity, price } = location.state || {};

  const token =localStorage.getItem('token')
  useEffect(() =>{
      if(!token){
        
          navigate('/login');
          //alert("Login first"); 
      }
      
  }, [])



  useEffect(() => {
    if (modelId) {
      fetchVehicleDetails();
      fetchItems('S');
    }
  }, [modelId]);

  useEffect(() => {
    if (selectedCategory === 'A') {
      fetchAccessoryOptions();
    }
  }, [selectedCategory]);

  const fetchVehicleDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cars/${modelId}`);
      const data = await response.json();
      setVehicleDetails(data);
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    }
  };

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
      
      const itemsWithDropdowns = await Promise.all(combinedData.map(async item => {
        if (item.is_configurable === 'Y') {
          const dropdownOptions = await fetchDropdownOptions(modelId, item.comp_id);
          return {
            ...item,
            dropdownOptions,
          };
        }
        return item;
      }));
  
      setItems(itemsWithDropdowns);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchDropdownOptions = async (modelId, compId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/alternate/${modelId}/${compId}`);
      const data = await response.json();
      return data.map(option => ({
        value: option.alt_comp_id,
        label: `${option.comp_name} - ₹${option.delta_price}`,
      }));
    } catch (error) {
      console.error('Error fetching dropdown options:', error);
      return [];
    }
  };

  const fetchAccessoryOptions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/alternate/${modelId}/108`);
      const data = await response.json();
      const options = data.map(option => ({
        id: option.alt_comp_id,
        name: option.comp_name,
        price: option.delta_price,
      }));
      setAccessoryOptions(options);
    } catch (error) {
      console.error('Error fetching accessory options:', error);
    }
  };

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
    if (category !== 'A') {
      fetchItems(category);
    }
  };

  const handleDropdownChange = (item, selectedOption) => {
    const newItem = {
      id: item.comp_id,
      name: `${item.comp_name}: ${selectedOption.label.split(' - ')[0]}`,
      price: parseFloat(selectedOption.label.split(' - ₹')[1]),
    };

    setSelectedItems(prevItems => {
      const updatedItems = prevItems.filter(selectedItem => selectedItem.id !== item.comp_id);
      return [...updatedItems, newItem];
    });
  };

  const handleCheckboxChange = (option, isChecked) => {
    if (isChecked) {
      setSelectedItems(prevItems => [...prevItems, option]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(item => item.id !== option.id));
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleConfirmOrder = () => {
    // Store data in session storage
    sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    sessionStorage.setItem('myOrder', JSON.stringify(selectedItems));
    sessionStorage.setItem('myPrice', JSON.stringify(price));
    sessionStorage.setItem('myQuantity', JSON.stringify(quantity));
    
    // Navigate to the Confirm Order page
    navigate('/confirmOrder');
  };



  const renderItemList = () => (
    <div style={{ width: '100%' }}>
      {items.map(item => (
        <div
          key={item.comp_id}
          style={{
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: item.is_configurable === 'Y' ? '#e7f0ff' : '#f5c6c6',
            color: item.is_configurable === 'Y' ? 'black' : 'darkred',
            borderRadius: '5px',
          }}
        >
          {item.comp_name}
          {item.is_configurable === 'Y' && selectedCategory !== 'S' && (
            <div style={{ marginLeft: '10px' }}>
              {item.dropdownOptions.map(option => (
                <div key={option.value}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedItems.some(selectedItem => selectedItem.id === item.comp_id && selectedItem.price === parseFloat(option.label.split(' - ₹')[1]))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleDropdownChange(item, option);
                        } else {
                          setSelectedItems(prevItems => prevItems.filter(selectedItem => !(selectedItem.id === item.comp_id && selectedItem.price === parseFloat(option.label.split(' - ₹')[1]))));
                        }
                      }}
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAccessoryOptions = () => (
    <div style={{ width: '100%' }}>
      {accessoryOptions.map(option => (
        <div key={option.id} style={{ padding: '10px', marginBottom: '10px' }}>
          <label>
            <input 
              type="checkbox" 
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            />
            {option.name} - ₹{option.price}
          </label>
        </div>
      ))}
    </div>
  );

  const renderSelectedItems = () => {
    const basePriceEntry = {
      id: 'base-price',
      name: 'Base Price',
      price: price || 0,
    };

    const basePriceTotal = basePriceEntry.price * quantity;
    const totalSelectedItems = selectedItems.reduce((sum, item) => sum + item.price * quantity, 0);
    const totalPrice = basePriceTotal + totalSelectedItems;

    return (
      <div style={selectedItemsContainerStyle}>
        <h4>Selected Items</h4>
        <div style={selectionBoxStyle}>
          <div style={leftSideStyle}>
            {selectedItems.map(item => (
              <div key={item.id} style={itemStyle}>
                <label>
                  <input 
                    type="checkbox" 
                    checked 
                    onChange={() => handleRemoveItem(item.id)} 
                  />
                  {item.name} - ₹{item.price}
                </label>
              </div>
            ))}
          </div>
          <div style={rightSideStyle}>
            <div style={itemStyle}>
              <label>
                {basePriceEntry.name} - ₹{basePriceEntry.price} x {quantity} = ₹{basePriceTotal}
              </label>
            </div>
            {selectedItems.map(item => (
              <div key={item.id} style={itemStyle}>
                <label>
                  {item.name} - ₹{item.price} x {quantity} = ₹{item.price * quantity}
                </label>
              </div>
            ))}
            <div style={totalStyle}>
              Net Payable: ₹{totalPrice}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBoxContent = () => {
    if (selectedCategory === 'A') {
      return renderAccessoryOptions();
    } else {
      return renderItemList();
    }
  };

  return (
    <div style={outerContainerStyle}>
      <Navbar bg="light" variant="light" style={navbarStyle}>
        <Nav className="justify-content-center" style={{ width: '100%' }}>
          <Nav.Link onClick={() => handleButtonClick('S')} style={selectedCategory === 'S' ? { ...footerButtonStyle, ...activeButtonStyle } : footerButtonStyle}>Std. Features</Nav.Link>
          <Nav.Link onClick={() => handleButtonClick('I')} style={selectedCategory === 'I' ? { ...footerButtonStyle, ...activeButtonStyle } : footerButtonStyle}>Interior</Nav.Link>
          <Nav.Link onClick={() => handleButtonClick('E')} style={selectedCategory === 'E' ? { ...footerButtonStyle, ...activeButtonStyle } : footerButtonStyle}>Exterior</Nav.Link>
          <Nav.Link onClick={() => handleButtonClick('A')} style={selectedCategory === 'A' ? { ...footerButtonStyle, ...activeButtonStyle } : footerButtonStyle}>Accessories</Nav.Link>
          <Nav.Link onClick={() => setSelectedItems([])} style={footerButtonStyle}>Cancel</Nav.Link>
          <Nav.Link onClick={handleConfirmOrder} style={footerButtonStyle}>Confirm Order</Nav.Link>
        </Nav>
      </Navbar>
      <div style={containerStyle}>
        <div style={carImageStyle}>
          {/* Display car image here */}
          {vehicleDetails ? (
            <img 
              src={`${process.env.PUBLIC_URL}${vehicleDetails.path}`} // Ensure this path is correct
              alt={vehicleDetails.carName} 
              style={imageStyle} 
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div style={optionsBoxStyle}>
          {renderBoxContent()}
        </div>
        {renderSelectedItems()}
      </div>
    </div>
  );
};

const outerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const navbarStyle = {
  marginTop: '20px',
  width: '100%',
};

const footerButtonStyle = {
  margin: '0 10px',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
  cursor: 'pointer',
};

const activeButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '20px',
};

const carImageStyle = {
  width: '30%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  height: '400px',
  backgroundColor: '#f0f0f0',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

const optionsBoxStyle = {
  width: '30%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  height: '400px',
  overflowY: 'auto',
};

const selectedItemsContainerStyle = {
  width: '30%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#e7f0ff',
  height: '400px',
  overflowY: 'auto',
};

const selectionBoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

const leftSideStyle = {
  paddingRight: '10px',
};

const rightSideStyle = {
  paddingLeft: '10px',
};

const itemStyle = {
  padding: '5px 0',
};

const totalStyle = {
  marginTop: '10px',
  fontWeight: 'bold',
};

export default Configure2;
