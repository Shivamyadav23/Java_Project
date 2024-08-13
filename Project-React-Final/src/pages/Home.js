import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import backgroundImage from '../assets/background.jpg'; // Adjust the path as necessary
import imgDetail from '../assets/Get Started Images/maruti_swift_lxi-removebg-preview.png';
import imgDetail2 from '../assets/Get Started Images/maruti_swift_zxi-removebg-preview.png';

const Home = () => {
  const { t } = useTranslation();

  // CSS for various animations
  const animations = `
    @keyframes borderBlink {
      0% { border-color: rgba(255, 255, 255, 0.8); }
      50% { border-color: transparent; }
      100% { border-color: rgba(255, 255, 255, 0.8); }
    }

    @keyframes glow {
      0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
      50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
      100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
    }

    @keyframes backgroundPulse {
      0% { background-color: rgba(0, 0, 0, 0.5); }
      50% { background-color: rgba(0, 0, 0, 0.7); }
      100% { background-color: rgba(0, 0, 0, 0.5); }
    }
  `;

  return (
    <>
      <style>{animations}</style> {/* Add the keyframe animations here */}
      
      {/* Header Component */}
      <div 
        style={{
          minHeight: '100vh', // Set to 100vh to cover the entire viewport height
          display: 'flex',
          flexDirection: 'column', // Ensure column layout
          justifyContent: 'center',
          alignItems: 'center', // Center horizontally
          gap: '1rem', // Adjust spacing as needed
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          backgroundSize: 'cover', // Ensures the image covers the entire background
          backgroundPosition: 'center', // Centers the image
          backgroundRepeat: 'no-repeat',
          textAlign: 'center', // Center text
          padding: '2rem', // Add padding to container
          animation: 'backgroundPulse 4s infinite', // Apply pulsing background effect
        }}
      >
        <Container>
          <Row>
            <Col>
              <div style={{
                border: '2px solid rgba(255, 255, 255, 0.8)', // Add border
                padding: '2rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
                display: 'inline-block', // Ensure width fits content
                // Remove pulse animation from here
              }}>
                <h1 style={{ 
                  fontWeight: '700',
                  color: '#fff',
                  fontSize: '3rem', // Increase font size
                  marginBottom: '1rem', // Adjusted margin
                  animation: 'glow 1.5s infinite' // Apply glowing text effect
                }}>
                  {t('headerTitle')}
                </h1>
                <p style={{ 
                  lineHeight: '1.6',
                  color: '#fff',
                  fontSize: '1.25rem', // Increase font size for paragraph
                }}>
                  {t('headerDescription')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* GetStarted Component */}
      <Container 
        fluid
        style={{
          //backgroundColor: '#fff4e6', // Light orange background
          paddingTop: '3rem', // Adjust padding as needed
          paddingBottom: '3rem', // Adjust padding as needed
        }}
      >
        <Row className="g-4">
          <Col xs={12} sm={8} md={6} className="d-flex flex-column justify-content-center">
            <div style={{ padding: '0 1.5rem' }}>
              <h2 style={{ 
                fontWeight: '700',
                color: '#333',
                fontSize: '2rem', // Increase font size
                marginBottom: '1rem', // Adjusted margin
                textAlign: 'start'
              }}>
                {t('customizeVehicleTitle')}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                textAlign: 'start',
                lineHeight: '1.5',
                color: '#515151',
                marginTop: '1.5rem'
              }}>
                {t('customizeVehicleDescription')}
              </p>
            </div>
          </Col>
          
          <Col xs={12} sm={4} md={6} className="d-flex justify-content-center">
            <img src={imgDetail} alt="" style={{ width: '100%' }} />
          </Col>

          <Col xs={12} sm={4} md={6} className="d-flex justify-content-center order-md-3">
            <img src={imgDetail2} alt="" style={{ width: '100%' }} />
          </Col>

          <Col xs={12} sm={8} md={6} className="d-flex flex-column justify-content-center order-md-4">
            <div style={{ padding: '0 1.5rem' }}>
              <h2 style={{ 
                fontWeight: '700',
                color: '#333',
                fontSize: '2rem', // Increase font size
                marginBottom: '1rem', // Adjusted margin
                textAlign: 'start'
              }}>
                {t('expertAssistanceTitle')}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                textAlign: 'start',
                lineHeight: '1.5',
                color: '#515151',
                marginTop: '1.5rem'
              }}>
                {t('expertAssistanceDescription')}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* GetInTouch Component */}
      <Container 
        fluid 
        style={{
          paddingTop: '3rem', // Increased padding-top
          paddingBottom: '2.5rem', // Adjusted padding-bottom
          backgroundColor: '#fff9c4', // Light yellow background color
          borderRadius: '0.5rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem', // Added margin-bottom for white space after the container
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}
      >
        <Row className="justify-content-center text-center">
          <Col xs={12} md={8} lg={6}>
            <h1 style={{ marginBottom: '1.5rem' }}>
              {t('getInTouchTitle')}
            </h1>
            <p style={{ 
              maxWidth: '500px', 
              margin: '0 auto 1.5rem auto',
              lineHeight: '1.5', 
              color: '#515151' 
            }}>
              {t('getInTouchDescription')}
            </p>
            <Button 
              as={Link}
              to={'/contact'}
              variant="dark" // Updated button color to dark blue
              style={{ 
                fontSize: '0.9rem',
                textTransform: 'capitalize', 
                padding: '0.5rem 2rem',
                borderRadius: '20px', // Rounded edges
                backgroundColor: '#14192d',
                borderColor: '#14192d',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e2a5a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14192d'}
            >
              {t('getInTouchButton')}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
