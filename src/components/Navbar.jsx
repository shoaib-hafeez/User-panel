import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUserStore from '../store/User-store';
import { logoutUser } from '../services/Auth-service';
import '../i18n'; // Import i18n configuration

const AppNavbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  // 🔹 Language Change Function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Save user preference
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.response?.data?.message || error.message);
      alert('Failed to logout. Please try again.');
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary"  sticky="top">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">My-App</Nav.Link> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/posts">{t("posts")}</Nav.Link>
              {user && <Nav.Link as={Link} to="/profile">{t("profile")}</Nav.Link>}
            </Nav>
            <Nav>
              {/* 🔹 Language Selector */}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {t("selectLanguage")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage("en")}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("ur")}>اردو</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {user ? (
                <>
                  <span className="navbar-text me-3">
                    {t("welcome", { name: user.username })}
                  </span>
                  <button className='logoutBtn'>
                    <Nav.Link onClick={handleShowModal}>{t("logout")}</Nav.Link>
                  </button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <button className="btn btn-primary">{t("login")}</button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    <button className="btn btn-secondary">{t("signup")}</button>
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
          <Modal.Title>{t("confirmLogout")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("sureLogout")}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("cancel")}
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            {t("logout")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;
