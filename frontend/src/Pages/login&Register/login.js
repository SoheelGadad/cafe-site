import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../pages-style/style.css";

function Loginpage() {
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
      <>
        <div className="wrapper">
          <h1>Hello Again!</h1>
          <p>
            Welcome back you've <br /> been missed!
          </p>
          <form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <p class="recover">
              <a href="/ForgetPassword">Recover Password</a>
            </p>
          </form>
          <button type="submit" value="Login">
            Sign in
          </button>
          <p className="or">----- or continue with -----</p>
          <div className="icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-github"></i>
            <i className="fab fa-facebook"></i>
          </div>
          <div className="not-member">
            Not a member? <a href="/register">Register Now</a>
          </div>
        </div>
      </>
    </MainScreen>
  );
}

export default Loginpage;
