import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

import ErrorMessage from "../../components/ErrorMessage";
import "./styles.css";

function Registerpage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [confirmpassword, setConfirmPassword] = useState("");
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
      <div className="register">
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

          <input type="submit" value="Register" className="button" />
          <div className="subnode">
            Already have an account?<a href="/Login">Sign In.</a>
          </div>
          <div className="social-icon">
            <p>---------------or--------------</p>
          </div>
        </form>
      </div>
    </MainScreen>
  );
}

export default Registerpage;
