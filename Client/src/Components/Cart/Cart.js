import React from "react";
import styled from "styled-components";
import img1 from "../../Images/2.jpg";

const CartPage = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPaper = styled.div`
  background-color: #fdfffc;
  color: black;
  margin: 10px;
  width: 8em;
  height: 10em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  img {
    max-height: 100px;
    width: auto;
  }

  p {
    text-align: center;
    margin: 2px;
  }

  button {
    margin: 25px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

function Cart() {
  return (
    <CartPage>
      <h1>Shopping cart</h1>
      <StyledDiv>
        <StyledPaper>
          <p>Popcorn</p>
          <p>$5</p>
          <img src={img1} max-width="10em" max-height="10em" />
        </StyledPaper>
      </StyledDiv>
      <button onClick={() => alert("Cart Purchased")}>Checkout</button>
    </CartPage>
  );
}

export default Cart;
