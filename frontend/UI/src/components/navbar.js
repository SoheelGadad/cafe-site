import React, { useContext } from "react";
import { NavbarBrand, NavLink } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../App";

const Headers = () => {
  const { state, dispatch } = useContext(UserContext);
  const Rendermenu = () => {
    if (state) {
      return (
        <>
          <NavLink href="/UserHome">Home</NavLink>

          <NavLink href="/Dashboard">Profile</NavLink>

          <NavLink href="/Logout">Logout</NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink href="/">Home</NavLink>

          <NavLink href="/Register">Register</NavLink>

          <NavLink href="/Login">Login</NavLink>
        </>
      );
    }
  };
  return (
    <div className="header">
      <Nav>
        <Navbar>
          <NavbarBrand className="nav-brand">
            <NavLink href="/">cafe shop</NavLink>
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
