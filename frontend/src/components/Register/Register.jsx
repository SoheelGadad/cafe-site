import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./styles.module.css";
import MainScreen from "../../components/MainScreen";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

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
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password));
  };

  return (
    <MainScreen>
      <div className="register-continer">
        <div className="container">
          <form onSubmit={submitHandler} className={Styles.formsub}>
            <h1 className={Styles.h3}>Register</h1>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}

            {loading && <Loading />}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className={Styles.input}
              required
            />
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className={Styles.input}
              required
            />
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className={Styles.input}
            />
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className={Styles.input}
            />
            <br />
            <input type="submit" value="Register" className={Styles.button} />
            <div
              style={{
                textAlign: "center",
                display: "block",
                marginTop: "5px",
              }}
            >
              Already have an account?<a href="/Login">Sign In.</a>
            </div>
          </form>
        </div>
      </div>
    </MainScreen>
  );
}

export default Registerpage;
