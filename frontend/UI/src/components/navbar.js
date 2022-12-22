import React, { useContext } from "react";
import { UserContext } from "../App";
import './navbar.css'

const Headers = () => {
  const { state, dispatch } = useContext(UserContext);
  const Rendermenu = () => {
    if (state) {
      return (
        <>
         <li>
            <a href='/' className='navlink'>
              <i></i>Home</a>
              </li>
              <li>
            <a href='/Dashboard' className='navlink'>
              <i></i>Profile</a>
              </li>
              <li>
            <a href='/Logout"' className='navlink'>
            <i class="fa-sharp fa-solid fa-right-to-bracket"></i>Logout</a>
              </li>
        </>
      );
    } else {
      return (
        <>
        <li>
            <a href='/' className='navlink'>
              <i class='fa-solid fa-house-user'></i>Home</a>
              </li>

              <li>
            <a href='/Register' className='navlink'>
            <i class="fa-solid fa-file-signature"></i>Register</a>
             </li>

              <li>
            <a href='/Login' className='navlink'>
            <i class="fa-solid fa-key"></i>Login</a>
              </li>
        </>
      );
    }
  };
  return (
        <nav className="NavbarItems">
           <a href='/' className='navbar-logo'>
            <h1 >CafeEra</h1></a>
            <ul className= "nav-menu">
            <Rendermenu />
            </ul>
        </nav>
  );
};

export default Headers;
