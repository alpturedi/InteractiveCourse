import MealDetails from "../components/MealDetails";
import { useParams } from "react-router";

const Meal = () => {
  let params = useParams();

  return (
    <div className="meal-page">
      {params?.id.length > 0 ? (
        <MealDetails id={params?.id} />
      ) : (
        <h2>Meal not found</h2>
      )}
    </div>
  );
};

export default Meal;
