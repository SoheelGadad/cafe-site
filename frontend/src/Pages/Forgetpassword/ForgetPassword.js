import { useState } from "react";
import axios from "axios";

import "../pages-style/style.css";

import Loading from "../../components/Loading";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    axios
      .post("/api/forget-password", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 200) {
          localStorage.setItem("userotp", JSON.stringify(res.data));
          navigate("/otp");

          alert("Email is send");
        } else {
          alert("Email / Server Error.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    try {
      const url = `/api/forget-password`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
      setloading("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {error && <div className="error_msg">{error}</div>}
          {msg && <div className="success_msg">{msg}</div>}
          {loading && <Loading />}
          <h3>Forget Password</h3>
          <br />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <button type="submit" value="Forget Password">
            Forget Password
          </button>
        </form>
        <div className="not-member">
          Return to? <a href="/Login">LOGIN</a>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
