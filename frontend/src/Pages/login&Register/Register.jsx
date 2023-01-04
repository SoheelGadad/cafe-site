import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

import ErrorMessage from "../../components/ErrorMessage";
import "../pages-style/style.css";

function Registerpage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  // const [confirmpassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/Login");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      setMessage("Passwords should be 8ch");
    } else dispatch(register(name, email, password));
  };

  return (
    <MainScreen>
      <div className="wrapper">
        <form onSubmit={submitHandler}>
          <h1>Register</h1>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}

          {loading && <Loading />}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <button type="submit" value="Register">
            Sign up
          </button>
          <div className="subnode">
            Already have an account?<a href="/Login">Sign In.</a>
          </div>
          <p className="or">----- or continue with -----</p>
          <div className="icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-github"></i>
            <i className="fab fa-facebook"></i>
          </div>
        </form>
      </div>
    </MainScreen>
  );
}

export default Registerpage;
