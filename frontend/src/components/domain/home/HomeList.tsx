import React from "react";
import HomeCard from "./HomeCard";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const HomeList = () => {
  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <HomeCard key={item} />
      ))}
    </div>
  );
};

export default HomeList;
