import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Book from "./components/book";
import ThankYou from "./components/thankYou";

import Login from "./components/Login/login";
import Logout from "./components/Logout/logout";
import Register from "./components/Register/Register";
import Dashboard from "./components/userdashbord/Dashboard";
import ForgetPassword from "./components/Forgetpassword/ForgetPassword";

//import UserDes from "./components/pages/main";

import { initialState, reducer } from "./reducer/useReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/home"} element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/Book" element={<Book />} />
      <Route exact path="/ThankYou" element={<ThankYou />} />
      <Route exact path="/Dashboard" element={<Dashboard />} />
      <Route exact path="/ForgetPassword" element={<ForgetPassword />} />
    </Routes>
  );
};
const App = () => {
  //hocking method
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};
export default App;
