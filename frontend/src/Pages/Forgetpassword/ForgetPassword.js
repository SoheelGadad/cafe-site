import { useState } from "react";
import axios from "axios";
import "../pages-style/style.css";

//import ErrorMessage from "../../components/ErrorMessage";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    axios
      .post("/api/forget-password", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 200) {
          alert("Email is send");
        } else {
          alert("Email / Server Error.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
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
