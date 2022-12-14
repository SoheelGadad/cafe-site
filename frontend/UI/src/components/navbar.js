import React from "react";
import { NavbarBrand } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default (props) => {
  return (
    <div className="container">
      <Navbar color="light" light expand="md">
        <NavbarBrand
          className="nav-brand"
          onClick={(_) => {
            props.setPage(0);
          }}
        >
          cafe shop
        </NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto">
            <Nav.Link href="main">Home</Nav.Link>
            <Nav.Link href="main">About Us</Nav.Link>
            <Nav.Link href="main">Login/signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr></hr>
    </div>
  );
};
