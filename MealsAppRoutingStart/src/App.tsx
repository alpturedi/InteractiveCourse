import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Meal from "./pages/Meal";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={/*#TODO*/ <Home />} />
          <Route path="/about" element={/*#TODO*/ <Home />} />
          <Route path="/contact" element={/*#TODO*/ <Home />} />
          <Route path="/meal/:id" element={<Meal />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
