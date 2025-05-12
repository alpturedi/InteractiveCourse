import { Link } from "react-router";

export default function MealCard({ meal, isRandom = false, onFavoriteToggle, isFavorite }) {
  return (
    <div className="meal">
      <Link to={`/meal/${meal.idMeal}`} className="meal-link">
        <div className="meal-header">
          {isRandom && <span className="random">Meal of the Day</span>}
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className="meal-body">
          <h3>{meal.strMeal}</h3>
          <button className="fav-btn" onClick={() => onFavoriteToggle(meal.idMeal)}>
            <i className={isFavorite ? "fas fa-heart active" : "far fa-heart"}></i>
          </button>
        </div>
      </Link>
    </div>
  );
}
