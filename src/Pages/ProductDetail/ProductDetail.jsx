import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/Product/ProductCard'
import Loading from '../../Components/Loader/Loading'
import axios from "axios";


const BaseURL = "https://fakestoreapi.com";
const ProductDetail = () => {
  const [product, setProduct]=useState({})
  const [isLoading, setIsLoading] = useState(false);

  const {productId}=useParams()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BaseURL}/products/${productId}/`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <ProductCard product={product} flex={true} rendereddescription={true} />
      )}
    </Layout>
  );
}

export default ProductDetail;
