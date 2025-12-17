export const imageInfo = [
  {
    name: "electronics",
    title: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
  },
  {
    name: "jewelery",
    title: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
  },
  {
    name: "men's clothing",
    title: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
  },
  {
    name: "women's clothing",
    title: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
  },
];


/*
async function getCategoriesDetails() {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());

  const categoryDetails = [];

  for (let category of categories) {
    const products = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    ).then((res) => res.json());

    categoryDetails.push({
      name: category,
      title: products[0].title, // use first product title
      image: products[0].image, // use first product image
    });
  }

  console.log(categoryDetails);
}

getCategoriesDetails();
*/