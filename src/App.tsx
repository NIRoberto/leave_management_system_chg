import { Route, Routes } from "react-router-dom";
import PageTitle from "./Components/Shared/SEO/dynamic_title";
import routes, { RouteItem } from "./Config/layout_routes";

function App() {
  const renderRoutes = (routes: RouteItem[]) => {
    return routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={route.layout ? <route.layout /> : route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <div>
      <header>
        <PageTitle title="Home | Leave Management System" />
        <Routes>{renderRoutes(routes)}</Routes>
      </header>
    </div>
  );
}

export default App;
