import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Book from "./components/book";
import ThankYou from "./components/thankYou";

import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import Dashboard from "./components/userdashbord/Dashboard";
import ForgetPassword from "./components/Forgetpassword/ForgetPassword";
import Userprofile from "./components/ProfileScreen/ProfileScreen";

import NewSubmit from "./components/Forgetpassword/NewSubmit";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Book" element={<Book />} />
      <Route path="/ThankYou" element={<ThankYou />} />

      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/otp" element={<NewSubmit />} />
      <Route path="/userprofile" element={<Userprofile />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
};
const App = () => {
  //hocking method

  const [setSearch] = useState("");
  return (
    <>
      <UserContext.Provider>
        <Navbar setSearch={(s) => setSearch(s)} />
        <Routing />
      </UserContext.Provider>
    </>
  );
};
export default App;
