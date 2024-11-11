import React from "react";
import HomeCard from "./HomeCard";

const items = [{ id: "1343ad8d063d80afa423e4b110a893e0" }];

const HomeList = () => {
  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <HomeCard key={item.id} id={item.id} />
      ))}
    </div>
  );
};

export default HomeList;
