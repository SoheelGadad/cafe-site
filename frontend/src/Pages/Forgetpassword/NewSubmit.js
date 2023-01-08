import { useState } from "react";
import axios from "axios";

function NewSubmit() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const url = `http://localhost:3005/reset-password/:id/:token`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    axios
      .post(url, {
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("Password Updated.");
          window.location = "/login";
        } else {
          alert("server err");
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
