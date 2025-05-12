import Home from "@/pages/Home";

export const RANDOM_MEAL_API = "https://www.themealdb.com/api/json/v1/1/random.php";
export const MEAL_BYID_API = (id: string) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
export const SEARCH_MEAL_API = (query: string) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

export const ROUTES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Meals",
    href: "/meals",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Admin",
    href: "/admin",
  },
];
