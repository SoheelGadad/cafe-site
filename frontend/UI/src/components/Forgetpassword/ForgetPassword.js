import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

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
        <form onSubmit={handleSubmit} className={styles.formsub}>
          <div className={styles.h3}>Forget Password</div>
          <br />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
            type="email"
            placeholder="Email"
          />
          <input
            type="submit"
            value="Forget Password"
            className={styles.button}
          />
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
