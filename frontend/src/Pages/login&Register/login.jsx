import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./styles.css";

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
      <div className="Loginpage">
        <form onSubmit={submitHandler} className="loginpage">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <div className="h3">
            <h1>Login</h1>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <div className="forgetapage">
            <Link
              style={{
                color: "#fff",
                textAlign: "right",
                display: "block",
                marginTop: "5px",
              }}
              to={"/ForgetPassword"}
            >
              Forget Password
            </Link>
          </div>

          <input type="submit" value="Login" className="button" />

          <br />
          <Link
            style={{
              textAlign: "center",
              display: "block",
              marginTop: "5px",
              color: "#fff",
            }}
            to={"/register"}
          >
            Become a new member
          </Link>
          <div className="social-icon">
            <p>---------------or--------------</p>
          </div>
        </form>
      </div>
    </MainScreen>
  );
}

export default Loginpage;
