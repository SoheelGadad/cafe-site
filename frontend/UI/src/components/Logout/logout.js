import { useState, useContext } from "react";
import { UserContext } from "../../App";

import { useNavigate } from "react-router-dom";
const logout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  localStorage.clear();
  dispatch({ type: "USER", payload: false });
  navigate("/");
};

export default logout;
