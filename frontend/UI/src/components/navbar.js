import React, { useEffect } from "react";
import { NavbarBrand, NavLink } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
            <NavLink href="/userprofile">{`${userInfo.name}`}</NavLink>

            <NavLink onClick={logoutHandler}>Logout</NavLink>
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
