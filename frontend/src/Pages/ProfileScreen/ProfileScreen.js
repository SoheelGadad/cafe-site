import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [pic, setPic] = useState();
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

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

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "cafewebsite");
      data.append("cloud_name", "soheelgadad");
      fetch("https://api.cloudinary.com/v1_1/soheelgadad/image/upload/", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (newpassword === confirmPassword)
      dispatch(
        updateProfile({ name, email, newpassword, pic, Address, PhoneNo })
      );
  };

  return (
    <MainScreen>
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <h1>EDIT PROFILE</h1>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="Address">
                <Form.Label> Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="PhoneNo">
                <Form.Label>PhoneNo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter PhoneNo"
                  value={PhoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="currentpassword">
                <Form.Label>Enter Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Current Password"
                  value={currentpassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Form.Control>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm new Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group controlId="pic">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => postDetails(e.target.files[0])}
                    multiple
                  />
                </Form.Group>
              </Form.Group>
              <br />
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
