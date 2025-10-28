import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Favorites from "../pages/Favorites.jsx";
import React, { lazy, Suspense } from "react";
const BookDetails = lazy(() => import("../pages/BookDetails.jsx"));
import PageNotFound from "../pages/PageNotFound.jsx";
import Loading from "../components/Loading/Loading.jsx";

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/books/:bookId" element={
          <Suspense fallback={<div>Loading book details...</div>}>
            <BookDetails />
          </Suspense>
        } />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
