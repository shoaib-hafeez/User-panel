import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/User-store'; // Import Zustand store
import { logoutUser } from '../services/Auth-service';

const AppNavbar = () => {
  const { user, logout } = useUserStore(); // Access Zustand store
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser({}); // Call logout API
      logout(); // Clear Zustand store
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error.response?.data?.message || error.message);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">My-App</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
            {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
          </Nav>
          <Nav>
            {user ? (
              <>
                <span className="navbar-text me-3">
                  Welcome, {user.username}!
                </span>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <button className="btn btn-primary">Login</button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <button className="btn btn-secondary">Signup</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
