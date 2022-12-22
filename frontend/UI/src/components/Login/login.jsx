import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./styles.module.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:3005/api/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userinfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
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
