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
        <section class="mainphoto"></section>

        <div class="title">
          <h1>CafeERA</h1>
          <h3 className="h3">If you're looking for morring cafe</h3>
          {userInfo ? (
            <Button color="none" className="book-table-btn" href="/Book">
              Book a Table
            </Button>
          ) : (
            <Button color="none" className="book-table-btn" href="/register">
              Signup
            </Button>
          )}
        </div>
      </div>
    </MainScreen>
  );
}

export default Home;
