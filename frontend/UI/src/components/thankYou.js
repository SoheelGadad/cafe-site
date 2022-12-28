import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default (_) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: "USER", payload: false });
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Thank You!</p>
          <i className="fas fa-pizza-slice thank-you-pizza"></i>
          <p className="thanks-subtext">
            You should receive an email with the details of your reservation.
          </p>
        </Col>
      </Row>
    </div>
  );
};
