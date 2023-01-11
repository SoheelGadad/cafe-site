import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
function NewSubmit() {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `${process.env.REACT_APP_BASE_URI}/reset-password/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/login";
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
        {validUrl ? (
          <form onSubmit={handleSubmit}>
            {error && <div className="error_msg">{error}</div>}
            {msg && <div className="success_msg">{msg}</div>}

            <h3> FORGET PASSWORD </h3>

            <input
              style={{ marginBottom: "20px" }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              placeholder="Enter New password"
              className="input-field"
            />
            <input
              style={{ marginBottom: "20px" }}
              value={confirmpassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="text"
              placeholder="Enter confirm password"
              className="input-field"
            />
            <button type="submit">CHANGE PASSWORD</button>
          </form>
        ) : (
          <h1>404 Not Found</h1>
        )}
      </div>
    </>
  );
}

export default NewSubmit;
