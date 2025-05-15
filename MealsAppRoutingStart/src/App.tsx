import { BrowserRouter, Routes, Route } from "react-router";

import NavBar from "./components/Layout";
import { ROUTES } from "./helpers/routes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          {ROUTES.map((route, index) =>
            route.component ? (
              <Route
                key={index}
                path={route.path}
                element={
                  route?.protected ? (
                    <ProtectedRoute>
                      <route.component />
                    </ProtectedRoute>
                  ) : (
                    <route.component />
                  )
                }
              />
            ) : null,
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
