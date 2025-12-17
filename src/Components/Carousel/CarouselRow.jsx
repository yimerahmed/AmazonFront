import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { images } from './data';
import Classes from './Carousel.module.css'
const CarouselRow = () => {
  return (
    <div className={Classes.carousel_wrapper}>
      <Carousel
        showArrows={true}
        showIndicators={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        swipeable={true}
      >
        {images.map((singleImage) => {
         return <img src={singleImage} alt="carousel image" className={Classes.carousel}/>
        })}
      </Carousel>
    </div>
  );
}

export default CarouselRow;
