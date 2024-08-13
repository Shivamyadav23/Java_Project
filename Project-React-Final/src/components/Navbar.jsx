import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CustomNavbar = () => {
  const location = useLocation(); // Hook to get the current route
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    // Optional: Add a slight delay before redirecting to ensure session storage is cleared
    setTimeout(() => {
      navigate('/login');
      window.location.reload(); // Force a page refresh to clear any state
    }, 100);
  };

  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

  const itemList = [
    { text: t('navbarHome'), to: '/' },
    { text: t('navbarAbout'), to: '/about' },
    { text: t('navbarContact'), to: '/contact' },
    isLoggedIn ? 
    { text: t('Logout'), to: '#', onClick: handleLogout } : 
    { text: t('navbarLogin'), to: '/login' },
    { text: t('navbarRegister'), to: '/register' }
  ];

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          V-Config
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {itemList.map((item) => {
              const { text, to, onClick } = item;
              const isActive = location.pathname === to; // Check if the current route is active

              return (
                <Nav.Link
                  key={text}
                  as={Link}
                  to={to}
                  onClick={onClick}
                  style={{
                    color: isActive ? '#fff' : '#ccc',
                    borderBottom: isActive ? '2px solid #fff' : 'none',
                    textDecoration: 'none',
                    margin: '0 1rem', // Add margin to space out links
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => e.currentTarget.style.color = isActive ? '#fff' : '#ccc'}
                >
                  {text}
                </Nav.Link>
              );
            })}

            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Language
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('mr')}> मराठी</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('hi')}>हिंदी</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('de')}>Deutsch</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
