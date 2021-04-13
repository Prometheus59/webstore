import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Button } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../Images/watch_test.jpeg";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import img2 from "../../Images/0.jpg";
import img3 from "../../Images/1.jpg";
import img4 from "../../Images/2.jpg";
import img5 from "../../Images/3.jpg";
import img6 from "../../Images/6.jpg";
import img7 from "../../Images/5.jpg";

const Homescreen = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #403f4c;

  h1 {
    text-align: center;
  }
`;

const StyledCarousel = styled(Carousel)`
  // background: #fdfffc;
  justify-content: center;

  img {
    max-height: 200px;
    max-width: 400px;
  }

  ul thumbs animated {
    display: none;
  }
`;

const FeaturedProducts = styled.div`
  width: 80%;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledPaper = styled.div`
  background-color: #fdfffc;
  color: black;
  margin: 40px;
  width: 12em;
  height: 16em;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    max-height: 100px;
    width: auto;
  }

  h3 {
    text-align: center;
    margin: 2px 0 30px 0;
  }

  button {
    margin: 25px;
  }
`;

function LandingPage() {
  const [state, setState] = useState({});
  const [loaded, markLoaded] = useState(false);

  let storedUser = "";
  if (localStorage.getItem("currentUser") !== null) {
    storedUser = localStorage.getItem("currentUser");
  }

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((res) => setState(res))
      .then(() => markLoaded(true))
      .then(() => console.log(state));
    // console.log(state);
  }, []);

  console.log(state[0]);

  return (
    <Homescreen>
      <h1>Welcome</h1>
      <span>{"shan"}</span>
      <StyledCarousel
        autoPlay="true"
        emulateTouch="true"
        infiniteLoop="true"
        useKeyboardArrows="true"
        showThumbs={false}
        width="100%"
        centerMode="true"
      >
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </StyledCarousel>
      <FeaturedProducts>
        <StyledPaper>
          <h3>Popcorn</h3>
          <img
            // src={require(`../../Images/${state[0]?.productID}.jpg`).default}
            src={img4}
            max-width="10em"
            max-height="10em"
          />
          <button type="button">
            <Link to="/product/1">See More</Link>
          </button>
        </StyledPaper>

        <StyledPaper>
          <h3>Diet Coke</h3>
          <img
            // src={require(`../../Images/${state[1]?.productID}.jpg`).default}
            src={img5}
            max-width="10em"
            max-height="10em"
          />
          <button type="button">
            <Link to="/product/2">See More</Link>
          </button>
        </StyledPaper>

        <StyledPaper>
          <h3>Snickers Bar</h3>
          <img
            src={img6}
            // src={require(`../../Images/2.jpg`).default}
            max-width="10em"
            max-height="10em"
          />
          <button type="button">
            <a href="/product/3">See More</a>
          </button>
        </StyledPaper>
      </FeaturedProducts>
    </Homescreen>
  );
}

export default LandingPage;
