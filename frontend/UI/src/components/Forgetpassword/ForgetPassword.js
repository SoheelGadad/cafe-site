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
      <form className={styles.form}>
        <h1 className={styles.h1}>Forget Password</h1>
        <div className={styles.email}>
          Email
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
            type="text"
          />
          <button onClick={handleSubmit} className={styles.button}>
            SEND OTP
          </button>
        </div>
      </form>
    </>
  );
}

export default ForgetPassword;
