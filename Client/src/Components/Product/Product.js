// https://wireframe.cc/tpHbo3
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import productImage from "../../Images/2.jpg";

const ProductPageStyle = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #403f4c;
`;

const ImgContainer = styled.div`
  img {
    max-height: 300px;
    max-width: 200px;
    margin: 40px;
  }
`;

function ProductPage(props) {
  const [state, setState] = useState({});
  const [loaded, markLoaded] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/product/${id}`)
      .then((res) => res.json())
      .then((res) => setState(res))
      .then(() => markLoaded(true))
      .then(() => console.log(state));
    console.log(state);
  }, [loaded, state]);

  let name = state[0]?.name || "name";
  let price = state[0]?.price || "price";
  let quantity = state[0]?.price || "quantity";

  console.log(id);

  return (
    <ProductPageStyle>
      <ImgContainer>
        <img src={productImage} />
      </ImgContainer>
      <div id="product-info">
        <h2>Popcorn</h2>
        <div>Price($): 5 </div>
        <p>Quantity Left: 12</p>
        <div>
          Description - Do you enjoy popped kernels? Then look no further than
          our premium popcorn!
        </div>
        <button onClick={() => alert("Popcorn has been added to cart")}>
          Add to cart
        </button>
      </div>
      <div id="related-products">{/* Implement carousel here */}</div>
    </ProductPageStyle>
  );
}

export default ProductPage;
