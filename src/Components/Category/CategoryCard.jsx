import React from 'react';
import {Link} from 'react-router-dom'
import Classes from './Category.module.css'
const CategoryCard = ({data}) => {
    // console.log(data)
  return (
    <div className={Classes.category}>
      <Link to={`/category/${data.name}`}>
        <span><h2>{data.title}</h2></span>
        <img src={data?.image} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
