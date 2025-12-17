import React from 'react';
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import CarouselRow from '../../Components/Carousel/CarouselRow';
import Layout from '../../Components/Layout/Layout';
const Landing = () => {
  return (
    <Layout>
      <CarouselRow />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
