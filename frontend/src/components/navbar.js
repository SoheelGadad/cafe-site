import React, { useEffect } from "react";
import { NavbarBrand, NavLink } from "reactstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./navbarStyle.css";
import { Container } from "react-bootstrap";

import { logout } from "../actions/userActions";
const Headers = (setSearch) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {}, [userInfo]);

  const Rendermenu = () => {
    return (
      <Nav className="me-auto">
        <Nav.Link className="link" href="/">
          Home
        </Nav.Link>
        {userInfo ? (
          <>
            <NavLink href="/Book" className="link">
              Book A Table
            </NavLink>
            <NavDropdown
              title={`${userInfo.name}`}
              id="collasible-nav-dropdown"
              className="link"
            >
              <NavDropdown.Item href="/userprofile">
                <img
                  alt=""
                  src={`${userInfo.pic}`}
                  width="25"
                  height="25"
                  style={{ marginRight: 10 }}
                />
                My Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <NavLink className="link" href="/Login">
            Login
          </NavLink>
        )}
      </Nav>
    );
  };
  return (
    <Navbar bg="dark" expand="sm">
      <Container>
        <NavbarBrand className="nav-brand">
          <NavLink href="/">Cafe shop</NavLink>
        </NavbarBrand>
        <Navbar.Toggle className="toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Rendermenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;
