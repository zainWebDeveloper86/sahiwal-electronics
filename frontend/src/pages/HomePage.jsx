import React from "react";
import Hero from "../components/Home/Hero.jsx";
import Categories from "../components/Home/Categories.jsx";
import BestDeals from "../components/Home/BestDeals.jsx";
import FeaturedProducts from "../components/Products/FeaturedProducts.jsx";
import Events from "../components/Events/Events.jsx";
import Sponsored from "../components/Sponsored/Sponsored.jsx";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <BestDeals />
      <Events/>
      <FeaturedProducts />
      <Sponsored />
    </div>
  );
};

export default HomePage;
