import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // history.push("/Dashboard");
      navigate("/");
    }
  }, [navigate, userInfo]);

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

                {userInfo ? (
                  <Button color="none" className="book-table-btn" href="/Book">
                    Book a Table
                  </Button>
                ) : (
                  <Button color="none" className="book-table-btn" href="/login">
                    Signup
                  </Button>
                )}
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
