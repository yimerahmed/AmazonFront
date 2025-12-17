import React, { useContext } from "react";
import Classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext, actionTypes } from "../../Context/DataContext";

const ProductCard = ({ product, flex, rendereddescription, renderadd }) => {
  const { title, id, rating = {}, price, image, description } = product;
  const [{ basket }, dispatch] = useContext(DataContext);

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: { id, title, price, image, rating, description },
    });
  };

  return (
    <div
      className={`${Classes.card_container} ${flex ? Classes.product_row : ""}`}
    >
      <div className={Classes.image_wrapper}>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>

      <div className={Classes.content_wrapper}>
        <h3>{title}</h3>

        {rendereddescription && (
          <p className={Classes.description}>{description}</p>
        )}

        <div className={Classes.rating}>
          <Rating value={rating.rate || 0} precision={0.1} readOnly />
          <small>({rating.count || 0})</small>
        </div>

        <CurrencyFormat amount={price} />

        {renderadd !== false && (
          <button className={Classes.button} onClick={addToBasket}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
