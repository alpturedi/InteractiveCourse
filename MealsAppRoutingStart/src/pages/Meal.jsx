import { Link, useParams } from "react-router";

import MealDetails from "@components/MealDetails";

export default function Meal() {
  let params = useParams();

  return (
    <>
      {/* <div className="back-to-home"></div> */}
      <div className="meal-page">
        <Link to="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        {params?.id.length > 0 ? <MealDetails id={params?.id} /> : <h2>Meal not found</h2>}
      </div>
    </>
  );
}
