import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cpassword, setcPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3005/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      alert("sucessfull login");
      navigate("/login");
    }
  }

  return (
    <div className="register-continer">
      <div className="container">
        <form onSubmit={registerUser} className={Styles.formsub}>
          <h1 className={Styles.h3}>Register</h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className={Styles.input}
          />
          <br />
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
          <input type="submit" value="Register" className={Styles.button} />
          <div
            style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          >
            Already have an account?<a href="/Login">Sign In.</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
