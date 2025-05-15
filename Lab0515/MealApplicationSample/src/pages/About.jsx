const About = () => {
  return (
    <div className="about-page">
      <h2>About Meal Finder</h2>
      <p>
        Meal Finder is an application that helps you discover delicious recipes 
        from around the world. Browse by categories, search for specific meals, 
        or get random meal suggestions.
      </p>
      <p>
        This application uses the <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">
        TheMealDB API</a> for meal data.
      </p>
    </div>
  );
};

export default About;