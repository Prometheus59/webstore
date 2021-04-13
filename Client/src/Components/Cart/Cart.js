import React from "react";
import styled from "styled-components";
import img1 from "../../Images/watch_test.jpeg";

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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

function Cart() {
  const [details, setDetails] = useState({ product: "" });
  const [state, setState] = useState({});
  const [loaded, markLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/products`)
      .then((res) => res.json())
      .then((res) => setState(res))
      .then(() => markLoaded(true))
      .then(() => console.log(state));
    console.log(state);
  }, [loaded, state]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(
      `/newOrder/:${details.product.amount}/:${details.product.orderCustomerID}/:${details.product.date}/:${details.product.productID}/:${details.product.invoiceAmount}`
    )
      .then((res) => res.json())
      .then((res) => console.log(state));
    alert(
      ` CHECKOUT COMPLETE\n\n CART:\n ${localStorage.getItem(
        "currItem"
      )}\n\n SUBTOTAL: ${localStorage.getItem("currPrice")}`
    );
    window.location = "/LandingPage";
  };

  return (
    <CartPage>
      <h1>Shopping cart</h1>
      <StyledDiv>
        <StyledPaper>
          <h3>Product 1</h3>
          <img src={img1} max-width="10em" max-height="10em" />
        </StyledPaper>
        <StyledPaper>
          <h3>Product 1</h3>
          <img src={img1} max-width="10em" max-height="10em" />
        </StyledPaper>
        <StyledPaper>
          <h3>Product 1</h3>
          <img src={img1} max-width="10em" max-height="10em" />
        </StyledPaper>
      </StyledDiv>
      <button type="submit" onClick={submitHandler}>
        Checkout
      </button>
    </CartPage>
  );
}

export default Cart;
