import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages-style/style.css";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    axios
      .post("/send-otp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          navigate("/otp");
        } else {
          alert("Email / Server Error.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
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
