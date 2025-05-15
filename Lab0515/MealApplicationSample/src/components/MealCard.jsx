import React from 'react'
import { useNavigate } from 'react-router-dom';

const MealCard = ({ meal, isRandom = false, onFavoriteToggle, isFavorite }) => {
  const navigate = useNavigate();

  const handleMealClick = () => {
    navigate(`/meal/${meal.idMeal}`);
  };
  return (
    <div className="meal">
      <div className="meal-header" onClick={handleMealClick}/* onClick={() => navigate(`/meal/${meal.idMeal}`)}*/>
        {isRandom && <span className="random">Meal of the Day</span>}
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
      <div className="meal-body">
        <h3>{meal.strMeal}</h3>
        <button 
          className="fav-btn" 
          onClick={() => onFavoriteToggle(meal.idMeal)}
        >
          <i className={isFavorite ? "fas fa-heart active" : "far fa-heart"}></i>
        </button>
      </div>
    </div>
  )
}

export default MealCard
