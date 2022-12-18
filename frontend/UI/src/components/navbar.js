import React from "react";
import { NavbarBrand, Button } from "reactstrap";
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
            <Nav.Link>
              <Button
                onClick={(_) => {
                  props.setPage(0);
                }}
              >
                Home
              </Button>
            </Nav.Link>
            <Nav.Link>
              <Button
                onClick={(_) => {
                  props.setPage(5);
                }}
              >
                profile
              </Button>
            </Nav.Link>
            <Nav.Link>
              <Button
                onClick={(_) => {
                  props.setPage(3);
                }}
              >
                Login
              </Button>
            </Nav.Link>
            <Nav.Link>
              <Button
                onClick={(_) => {
                  props.setPage(4);
                }}
              >
                Register
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr></hr>
    </div>
  );
};
