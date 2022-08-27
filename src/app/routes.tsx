import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import HomePage from "./pages/home/home";

const AppRouter = () => {
  const LoadingMessage = () => <div>Loading..</div>;
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingMessage />}>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
