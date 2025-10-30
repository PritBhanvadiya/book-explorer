
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Favorites from "../pages/Favorites.jsx";
import { lazy, Suspense } from "react";
import PageNotFound from "../pages/PageNotFound.jsx";
import Loading from "../components/Loading/Loading.jsx";
const BookDetails = lazy(() => import("../pages/BookDetails.jsx"));

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
