import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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
        <div className="row">
          <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="profile-card card rounded-lg shadow p-4 p-xl-5 mb-4 text-center position-relative overflow-hidden">
              <div className="banner"></div>
              <img src="{pic}" alt="" className="img-circle mx-auto mb-3" />
              <h3 className="mb-4">{name}</h3>
              <div className="text-left mb-4">
                <p className="mb-2">
                  <i className="fa fa-envelope mr-2"></i>
                  {email}
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone mr-2"></i> +91 9876543215
                </p>

                <p className="mb-2">
                  <i className="fa fa-map-marker-alt mr-2"></i> Bangalore
                </p>
              </div>
              <div className="social-links d-flex justify-content-center">
                <a href="#!" className="mx-2">
                  <img src="img/social/dribbble.svg" alt="Dribbble" />
                </a>
                <a href="#!" className="mx-2">
                  <img src="img/social/facebook.svg" alt="Facebook" />
                </a>
                <a href="#!" className="mx-2">
                  <img src="img/social/linkedin.svg" alt="Linkedin" />
                </a>
                <a href="#!" className="mx-2">
                  <img src="img/social/youtube.svg" alt="Youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainScreen>
  );
};

export default ViewProfile;
