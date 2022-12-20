import { useState, useContext } from "react";
import "./login.css";
import { UserContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3005/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      dispatch({ type: "USER", payload: true });
      navigate("/Dashboard");
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser} className="formsub">
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
        <br />
        <input type="submit" value="Login" />
        <Link
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          to={"/ForgetPassword"}
        >
          Forget Password
        </Link>
      </form>
    </div>
  );
};

export default Login;
