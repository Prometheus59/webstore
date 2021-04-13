import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import styled from "styled-components";
import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const NavDiv = styled.div`
  width: 100%;
  position: static;
  top: 0;
  height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: darkgrey;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 10px;
  }

  ul li {
    margin: 10px;
  }
`;

const CountrySelection = styled.div`
  border-style: solid;
  border-color: grey;
  background-color: #fdfffc;
  padding: 4px;
  margin: 0 20px 0 auto;
  color: black;
`;

const BackgroundColor = styled.div`
  background-color: #403f4c;
  color: white;
  min-height: 60em;
`;

const Footer = styled.div``;

function App() {
  return (
    <Router>
      <BackgroundColor>
        <NavDiv>
          <ul>
            <li>
              <Link to="/landingpage">Home</Link>
            </li>
            {/* <li>
              <Link to="/product">Product</Link>
            </li> */}
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <select name="Country">
                <option value="Canada">Canada</option>
                <option value="USA">USA</option>
              </select>
            </li>

            <li>
              <Link to="/signin">Sign In</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </NavDiv>

        {/* <Navbar /> */}
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route
            path="/product/:id"
            children={
              <Product name="Test name" price="5" specification="lorem ipsum" />
            }
          ></Route>
          <Route path="/product">
            <Product name="Test name" price="5" specification="lorem ipsum" />
          </Route>

          <Route path="/signIn">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BackgroundColor>
    </Router>
  );
}

export default App;
