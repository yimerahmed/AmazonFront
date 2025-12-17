import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../API/Base";
import ProductCard from "../../Components/Product/ProductCard";
import Loading from "../../Components/Loader/Loading";
import Classes from "./Results.module.css";

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Destructure the param (assuming your route is /category/:categoryName)
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BaseURL}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category: {categoryName}</p>
        <hr />

        {isLoading ? (
          <Loading />
        ) : results.length > 0 ? (
          <div className={Classes.products_container}>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ padding: "30px" }}>No products found in this category.</p>
        )}
      </section>
    </Layout>
  );
};

export default Results;
