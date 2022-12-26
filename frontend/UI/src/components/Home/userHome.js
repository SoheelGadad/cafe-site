import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../App";

import { useNavigate } from "react-router-dom";
export default (props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  dispatch({ type: "USER", payload: true });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      dispatch({ type: "USER", payload: false });
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div class="home swiper" id="home">
        <div class="swiper-wrapper">
          <div class="swiper-slide container">
            <img
              src={require("../Home/1.jpg")}
              alt="cafe"
              className="big-img"
            />
            <div class="home-text">
              <h1>CafeERAA</h1>
              <p className="looking-for-cafe">
                If you're looking for morring cafe
              </p>
              <Button color="none" className="book-table-btn" href="/Book">
                Book a Table
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper"></div>
    </div>
  );
};
