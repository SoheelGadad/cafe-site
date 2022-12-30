import React, { useEffect } from "react";
import { NavbarBrand, NavLink } from "reactstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

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
      <Nav>
        <NavLink href="/">Home</NavLink>
        {userInfo ? (
          <>
            <NavLink href="/Book">Book A Table</NavLink>
            <NavDropdown
              title={`${userInfo.name}`}
              id="collasible-nav-dropdown"
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
          <NavLink href="/Login">Login</NavLink>
        )}
      </Nav>
    );
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
