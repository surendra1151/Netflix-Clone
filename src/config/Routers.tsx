import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

import MainLayout from "./MainLayout";
import LoadingScreen from "src/common/LoadingScreen";

const Home = React.lazy(() => import("src/components/HomePage"));

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={MAIN_PATH.browse} />}
          />
          <Route path={MAIN_PATH.browse} element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
