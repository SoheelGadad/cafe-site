import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log(email);
    axios
      .post("http://localhost:3005/send-otp", {
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
      <div>
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
          <input type="submit" value="Forget Password" className="button" />
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
