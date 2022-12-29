import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "./MainScreen";
import './Home.css'

function Home() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // history.push("/Dashboard");
      navigate("/");
    }
  }, [userInfo]);

  return (
    <MainScreen>
      <div>
        <div class="home swiper" id="home">
          <div class="swiper-wrapper">
            <div class="swiper-slide container">
              <div class="home-text">
                <h1>CafeERA</h1>
                <p className="looking-for-cafe">
                  If you're looking for morring cafe
                </p>
                <button className="btnReg" onClick="/register">
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper"></div>
      </div>
    </MainScreen>
  );
}

export default Home;
