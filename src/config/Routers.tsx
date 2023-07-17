import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./MainLayout";
import LoadingScreen from "src/common/LoadingScreen";
import { MAIN_PATH } from "src/constant";

const Home = React.lazy(() => import("src/components/HomePage"));
const Watch = React.lazy(() => import("src/components/WatchPage"));
const Genre = React.lazy(() => import("src/components/GenreExplore"));

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              path={MAIN_PATH.root}
              element={<Navigate to={`/${MAIN_PATH.browse}`} replace />}
            />
            <Route path={MAIN_PATH.browse} element={<Home />} />
            <Route
              path={`${MAIN_PATH.genreExplore}/:genreId`}
              element={<Genre />}
            />
            <Route path={MAIN_PATH.watch} element={<Watch />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
