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
        <section className="mainphoto"></section>

        <div className="title">
          <div className="title_container">
            <h2>
              Welcome to our<h1>CafeERA</h1>
            </h2>
            <sub className="subtitle">Lets's Book Your Next Table</sub>
            <br />
            {userInfo ? (
              <Button color="none" className="book-button" href="/Book">
                Book a Table
              </Button>
            ) : (
              <Button color="none" className="book-button" href="/Login">
                Signup
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainScreen>
  );
}

export default Home;
