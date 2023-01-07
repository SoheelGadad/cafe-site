import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewSubmit() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    console.log(otp, password);
    axios
      .post("http://localhost:3005/submit-otp", {
        otp: otp,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (password === confirmpassword && res.data.code === 200) {
          alert("Password Updated.");
          navigate("/Login");
          localStorage.removeItem("userotp");
        } else {
          alert("server err / wrong OTP");
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
          <h3> FORGET PASSWORD </h3>

          <input
            style={{ marginBottom: "15px" }}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            value={otp}
            type="text"
            placeholder="Enter OTP"
          />

          <input
            style={{ marginBottom: "20px" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            placeholder="Enter New password"
          />
          <input
            style={{ marginBottom: "20px" }}
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="text"
            placeholder="Enter confirm password"
          />
          <button type="submit">CHANGE PASSWORD</button>
        </form>
      </div>
    </>
  );
}

export default NewSubmit;
