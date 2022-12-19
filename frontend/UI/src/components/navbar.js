import React, { useContext } from "react";
import { NavbarBrand } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Headers = () => {
  const { state, dispatch } = useContext(UserContext);
  const Rendermenu = () => {
    if (state) {
      return (
        <>
          <Link to="/">Home</Link>

          <Link to="/Dashboard">Profile</Link>

          <Link to="/Logout">Logout</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/">Home</Link>

          <Link to="/Register">Register</Link>

          <Link to="/Login">Login</Link>
        </>
      );
    }
  };
  return (
    <div className="container">
      <Nav>
        <Navbar color="light" light expand="md">
          <NavbarBrand className="nav-brand">
            <Link to="/">cafe shop</Link>
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Rendermenu />
          </Navbar.Collapse>
        </Navbar>
      </Nav>
      <hr></hr>
    </div>
  );
};

export default Headers;
