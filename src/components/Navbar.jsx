import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/User-store';
import { logoutUser } from '../services/Auth-service';

const AppNavbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  //  Modal state
  const [showModal, setShowModal] = useState(false);

  //  Modal show/hide handlers
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //  Logout confirmation
  const handleConfirmLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.response?.data?.message || error.message);
      alert('Failed to logout. Please try again.');
    } finally {
      handleCloseModal(); // Modal ko close karo
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">My-App</Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
              {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
            </Nav>
            <Nav>
              {user ? (
                <>
                  <span className="navbar-text me-3">
                    Welcome <b>{user.username}!</b>
                  </span>
                  <button className='logoutBtn'>
                    <Nav.Link onClick={handleShowModal}>Logout</Nav.Link>
                  </button>
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

      {/* 🔴 Logout Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;
