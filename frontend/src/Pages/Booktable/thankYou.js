import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default (_) => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
          <img
            alt="thankyou"
            src={require("../../images/verified.gif")}
            height="50px"
            width="50px"
          />
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
