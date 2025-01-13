// src/layouts/DashboardLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Container>

      <AppNavbar />

      <div className="dashboard-content">
        <Outlet /> {/* Render child routes here */}
      </div>
      
      </Container>
    </>
  );
};

export default Dashboard;
