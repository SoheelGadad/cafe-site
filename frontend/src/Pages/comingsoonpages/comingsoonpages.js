import React from "react";
import "./style.css";
//import { NavLink } from "react-router-dom";

import MainScreen from "../../components/MainScreen";
const ConstructionPages = () => {
  return (
    <MainScreen>
      <>
        <section className="contacts">
          <h1>
            <span>Coming soon</span>
          </h1>
          <h2 className="sub-titles">Site Under Construction</h2>
        </section>
      </>
    </MainScreen>
  );
};

export default ConstructionPages;
