import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      dispatch({ type: "USER", payload: false });
      navigate("/login");
    }
  }, []);

  return (
    <div className="card">
      <div>HOME</div>
      <div>
        <span> {localStorage.getItem("EMAIL")} </span>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default logout;
