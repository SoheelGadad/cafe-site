import React from "react";

import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <NavLink href="/" className="nav-logo">
          <h3>
            CafeERA
            <i className="fa fa-coffee"></i>
          </h3>
        </NavLink>

        <p class="footer-links">
          <a href="/" class="link-1">
            Home
          </a>

          <a href="/comingsoonPages">Blog</a>

          <a href="/about">About</a>

          <a href="/comingsoonPages">Faq</a>

          <a href="/comingsoonPages">Contact</a>
        </p>
      </div>

      <div class="footer-center"></div>

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          This is a demo of a cafe website with are giving Table book services
          to they customers.
        </p>

        <div class="footer-icons">
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-github"></i>
          </a>
        </div>
      </div>
      <center>
        <p class="footer-company-name">CafeERA © 2023</p>
      </center>
    </footer>
  );
};

export default Footer;
