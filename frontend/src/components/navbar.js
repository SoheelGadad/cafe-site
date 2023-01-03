import React, { useEffect } from "react";
import { NavbarBrand, NavLink } from "reactstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./navbarStyle.css";

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
      <ul className="nav-menu">
        <li className="nav-links">
          <NavLink href="/" activeClassName="active" className="nav-links">
            Home
          </NavLink>
        </li>

        {userInfo ? (
          <>
            <li>
              <a href="/Book">Book A Table</a>
            </li>

            <NavDropdown
              title={`${userInfo.name}`}
              id="collasible-nav-dropdown"
              className="link"
            >
              <NavDropdown.Item href="/userprofile" className="li">
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
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </NavDropdown>
          </>
        ) : (
          <li>
            <a href="/Login">Login</a>
          </li>
        )}
        <li>
          <a href="#">about</a>
        </li>
      </ul>
    );
  };
  return (
    <div className="nav">
      <div className="nav-container">
        <NavLink href="/" className="nav-logo">
          Cafe shop
        </NavLink>

        <Rendermenu />
      </div>
    </div>
  );
};

export default Headers;
