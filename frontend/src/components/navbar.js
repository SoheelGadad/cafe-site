import React, { useEffect } from "react";
import { NavbarBrand, NavLink } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import './navbarStyle.css'
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
        <Nav.Link className='link' href="/" >Home</Nav.Link>
        {userInfo ? (
          <>
            <NavLink className='link'  href="/Book">Book A Table</NavLink>
            <NavLink className='link' href="/userprofile">{`${userInfo.name}`}</NavLink>

            <NavLink className='link' onClick={logoutHandler}>Logout</NavLink>
          </>
        ) : (
          <NavLink className='link' href="/Login">Login</NavLink>
        )}
      </Nav>
    );
  };
  return (
        <Navbar bg="dark" expand="sm">
        <Container >
          <NavbarBrand className="nav-brand" >
            <NavLink href="/">Cafe shop</NavLink>
          </NavbarBrand>
          <Navbar.Toggle className="toggle"  aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse 
            id="responsive-navbar-nav">
            <Rendermenu />
           
          </Navbar.Collapse>
          </Container>
        </Navbar>


  );
};

export default Headers;
