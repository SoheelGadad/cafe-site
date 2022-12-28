import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "./MainScreen";

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
              <img
                src={require("../images/1.jpg")}
                alt="cafe"
                className="big-img"
              />
              <div class="home-text">
                <h1>CafeERA</h1>
                <p className="looking-for-cafe">
                  If you're looking for morring cafe
                </p>
                <Button color="none" className="book-table-btn" onClick="/book">
                  Book a Table
                </Button>

                <Button onClick="/login">Login/signup</Button>
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
