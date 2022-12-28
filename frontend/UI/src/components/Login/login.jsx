import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen>
      <div className="Loginpage">
        <form onSubmit={submitHandler} className={Styles.formsub}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <div className={Styles.h3}>
            <h3>Login</h3>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className={Styles.input}
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className={Styles.input}
          />
          <br />
          <input type="submit" value="Login" className={Styles.button} />
          <Link
            style={{ textAlign: "center", display: "block", marginTop: "5px" }}
            to={"/ForgetPassword"}
          >
            Forget Password
          </Link>
          <br />
          <Link
            style={{ textAlign: "center", display: "block", marginTop: "5px" }}
            to={"/register"}
          >
            become a new member
          </Link>
        </form>
      </div>
    </MainScreen>
  );
}

export default loginpage;
