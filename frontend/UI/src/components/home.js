import React from "react";
import Button from "react-bootstrap/Button";

export default (props) => {
  return (
    <div>
      <div class="home swiper" id="home">
        <div class="swiper-wrapper">
          <div class="swiper-slide container">
            <img
              src={require("../images/1.jpg")}
              alt="cafe"
              className="big-img"
            />
            <div class="home-text">
              <h1>CafeERA</h1>
              <p className="looking-for-cafe">
                If you're looking for morring cafe
              </p>
              <Button color="none" className="book-table-btn" href="/Book">
                Book a Table
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper"></div>
    </div>
  );
};
