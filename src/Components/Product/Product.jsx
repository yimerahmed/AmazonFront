import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Classes from "./Product.module.css";
import Loading from "../Loader/Loading";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res)
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={Classes.product_wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={Classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard key={singleProduct.id} product={singleProduct} />
          ))}
        </section>
      )}
    </section>
  );
};

export default Product;
