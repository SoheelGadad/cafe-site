import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
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

  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const Rendermenu = () => {
    return (
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <NavLink
            href="/"
            activeClassName="active"
            className="nav-links"
            onClick={click ? handleClick : null}
          >
            <i className="fa fa-home"></i>
            Home
          </NavLink>
        </li>

        {userInfo ? (
          <>
            <li className="nav-item">
              <NavLink
                href="/Book"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Book A Table
              </NavLink>
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
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-links"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </li>
            </NavDropdown>
          </>
        ) : (
          <li className="nav-item">
            <NavLink
              href="/Login"
              activeClassName="active"
              className="nav-links"
              onClick={click ? handleClick : null}
            >
              Login
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink
            href="#"
            activeClassName="active"
            className="nav-links"
            onClick={click ? handleClick : null}
          >
            about
          </NavLink>
        </li>
      </ul>
    );
  };
  return (
    <>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink href="/" className="nav-logo">
            CafeERA
            <i className="fa fa-coffee"></i>
          </NavLink>
          <Rendermenu />
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Headers;
