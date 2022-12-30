import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./Login&Register.css";

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
          <br />
          <input
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="ConfirmPassword"
          />
          <br />
          <input type="submit" value="Register" className="button" />
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
    </MainScreen>
  );
}

export default Registerpage;
