import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
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
      setAddress(userInfo.Address);
      setPhoneNo(userInfo.PhoneNo);
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
              <img src={pic} alt="" className="img-circle mx-auto mb-3" />
              <h3 className="mb-4">{name}</h3>
              <div className="text-left mb-4">
                <p className="mb-2">
                  <i className="fa fa-envelope mr-2"></i>
                  {email}
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone mr-2"></i> +91 {PhoneNo}
                </p>

                <p className="mb-2">
                  <i className="fa fa-map-marker mr-2"></i> {Address}
                </p>
              </div>

              <br />

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
        </div>
      </>
    </MainScreen>
  );
};

export default ViewProfile;
