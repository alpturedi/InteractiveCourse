import Search from "../components/Search";
import Favorites from "../components/Favorites";
import MealCard from "../components/MealCard";
import { useEffect, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";

const Home = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [favMeals, setFavMeals] = useState([]);

  useEffect(() => {
    (async () => {
      // statements…
      const data = await (
        await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      ).json();

      const favoriteMeals = await (
        await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
      ).json();

      setFavMeals(favoriteMeals?.meals ?? []);

      setRandomMeal(data?.meals?.[0] ?? {});
    })();
  }, []);

  return (
    <div className="store">
      <Search />

      <Favorites favMeals={favMeals} />

      <div className="meals" id="meals">
        <MealCard mealData={randomMeal} />
      </div>
      <br />
      <pre
        dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(favMeals) }}
      ></pre>
    </div>
  );
};

export default Home;
