import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./Pages/Home/home";
import Book from "./Pages/Booktable/book";
import ThankYou from "./Pages/Booktable/thankYou";
import Login from "./Pages/login&Register/login";
import Register from "./Pages/login&Register/Register";
import ForgetPassword from "./Pages/Forgetpassword/ForgetPassword";
import Userprofile from "./Pages/ProfileScreen/ProfileScreen";
import NewSubmit from "./Pages/Forgetpassword/NewSubmit";

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
