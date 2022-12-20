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
    <div>
      <div className={Styles.h3}>
      <h1>Register</h1></div>
      <form onSubmit={registerUser} className Style={form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name" className={Styles.input}
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email" className={Styles.input}
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password" className={Styles.input}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
