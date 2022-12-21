import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./styles.module.css";

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
      <form onSubmit={loginUser} className={Styles.formsub}>
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
        <div className={Styles.social}>
          <div className={Styles.go}>
            <i class="fab fa-google"></i> Google
          </div>
          <div className={Styles.fb}>
            <i class="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
