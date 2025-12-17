import React from "react";
import { imageInfo } from "./CategoryInfo"; // ✔️ named import
import CategoryCard from "./CategoryCard";
import Classes from './Category.module.css'
const Category = () => {
  return (
    <div className={Classes.category_container}>
      {imageInfo.map((info) => (
        <CategoryCard data={info} key={info.name} />
      ))}
    </div>
  );
};

export default Category;
