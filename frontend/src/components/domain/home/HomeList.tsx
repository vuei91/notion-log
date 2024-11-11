import React from "react";
import HomeCard from "./HomeCard";

const items = [1];

const HomeList = () => {
  return (
    <div>
      {items.map((item) => (
        <HomeCard key={item} />
      ))}
    </div>
  );
};

export default HomeList;
