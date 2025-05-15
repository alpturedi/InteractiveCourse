import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import Meal from "../pages/Meal";

export const ROUTES = [
  {
    title: "Home",
    path: "/",
    component: Home,
  },
  {
    title: "Meal",
    path: "/meal/:id",
    component: Meal,
    hidden: true,
  },
  {
    title: "About",
    path: "/about",
    component: About,
  },
  {
    title: "Contact",
    path: "/contact",
    component: Contact,
  },
  {
    title: "Admin",
    path: "/admin",
    component: Admin,
    protected: true,
  },
  {
    title: "404",
    path: "*",
    component: NotFound,
    hidden: true,
  },
];
