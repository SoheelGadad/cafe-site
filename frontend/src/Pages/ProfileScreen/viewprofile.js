import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  return (
    <MainScreen>
      <>
        <div class="box">
          <img src={pic} alt="" class="box-img" />
          <div class="font">
            <h1>{name}</h1>
            <p>Date of birth is :- 12/22/20223</p>
            <p>Email is : {email}</p>

            <div className="Button">
              <Button type="submit" varient="primary" href="/userprofile">
                Edit profile
              </Button>
              <Button type="submit" varient="primary" href="#">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </>
    </MainScreen>
  );
};

export default ViewProfile;
