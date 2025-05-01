import { useEffect, useState } from "react";

import MealCard, { Meal } from "./components/MealCard";
import CategorySelect, { Category } from "./components/CategorySelect";
import SearchBar from "./components/SearchBar";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState([]);

  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { categories } = await (await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")).json();

      if (categories?.length > 0) {
        setCategories(categories);
        const { meals } = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[0].strCategory}`)).json();
        setMeals(meals);
      }
    })();
  }, []);

  async function onCategoryChange(category: Category) {
    setIsSearchActive(false);
    const { meals } = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category?.strCategory}`)).json();
    setMeals(meals);
  }

  async function onSearch(search: string) {
    setIsSearchActive(true);
    const { meals } = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)).json();
    setMeals(meals);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Meals</h1>

          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <CategorySelect categories={categories} onChange={onCategoryChange} isSearchActive={isSearchActive} />
            <SearchBar onSearch={onSearch} />
          </div>
        </header>

        <main>
          {meals?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {meals?.map((meal: Meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No meals found</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
