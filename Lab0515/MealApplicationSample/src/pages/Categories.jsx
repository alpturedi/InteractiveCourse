import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-page">
      <h2>Meal Categories</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div>
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h3>{category.strCategory}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;