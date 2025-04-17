const Favorites = ({ favMeals }) => {
  return (
    <div class="favorites-section">
      <h3>Favorites</h3>
      <ul class="favorites">
        {favMeals?.map((meal) => {
          return (
            <li
              key={meal.idMeal}
              className="w-full
            
            "
            >
              <img className="max-w-3xs" src={meal.strMealThumb} alt="" />
              <span>{meal.strMeal}</span>
              <button class="clear">
                <i class="fas fa-window-close"></i>
              </button>
            </li>
          );
        })}
        {/* <li>
          <img
            id="fav-img"
            src="https://www.themealdb.com/images/ingredients/Lime.png"
            alt=""
          />
          <span>Item 1</span>
          <button class="clear">
            <i class="fas fa-window-close"></i>
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default Favorites;
