import React from "react";
import '../Home.css'
import MainScreen from "../../components/MainScreen";
import { useSelector } from "react-redux";

const Home = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <br></br>
    </MainScreen>
  );
};

export default Home;
