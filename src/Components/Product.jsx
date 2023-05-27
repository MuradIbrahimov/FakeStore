import React from "react";

function Product({ data, buyFunction, sellFunction, basket }) {
  let check = basket.find((a) => a.id === data.id);

  return (
    <>
      <div className="product">
        <div className="product__image">
          <img src={data.image} alt={data.title} />
        </div>
        <div className="product__details">
          <h2>{data.title.slice(0, 25)}...</h2>
          <h1>{data.price}</h1>
        </div>
        <div className="product__operations">
          <button
            disabled={check ? (check.count === 0 ? true : false) : false}
            className="sellBtn"
            onClick={() => sellFunction(data.id)}
          >
            Sell
          </button>
          <h3>{check ? check.count : 0}</h3>
          <button className="buyBtn" onClick={() => buyFunction(data.id)}>
            Buy
          </button>
        </div>
      </div>
    </>
  );
}
export default Product;
