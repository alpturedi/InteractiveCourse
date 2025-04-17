import React from "react";

const MealCard = ({ mealData }) => {
  console.log("¡ ⛰️ ~ MealCard ~ mealData⛰️ !", mealData);

  return (
    <div className="meal">
      <h2>Hello World</h2>
      <span>{mealData?.strMeal ?? ""}</span>

      {mealData?.strMealThumb && <img src={mealData?.strMealThumb} />}
    </div>
  );
};

export default MealCard;
