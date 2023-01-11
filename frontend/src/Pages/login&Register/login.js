import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../pages-style/style.css";
import backgroundVideo from "../../images/LoginbackgroundVideo.mp4";

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
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen>
      <>
        <div>
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
                <a href="/ForgetPassword">Forgot Password?</a>
              </p>

              <button type="submit" value="Login">
                Sign in
              </button>
            </form>
            <p className="or">--------- or continue with ---------</p>
            <div className="icons">
              <i className="fa fa-google"></i>
              <i className="fa fa-linkedin-square"></i>
              <i className="fa fa-facebook"></i>
            </div>
            <div className="not-member">
              Not a member? <a href="/register">Register Now</a>
            </div>
          </div>
        </div>
      </>
    </MainScreen>
  );
}

export default Loginpage;
