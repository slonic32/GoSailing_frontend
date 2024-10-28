import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/auth/operations.js";
import { selectError, selectLoading } from "./redux/selectors.js";
import Loader from "./components/Loader/Loader.jsx";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Error from "./components/Error/Error.jsx";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import SharedLayout from "./pages/SharedLayout/SharedLayout.jsx";
import AddTrailerPage from "./pages/AddTrailerPage/AddTrailerPage.jsx";
import AddSailboatPage from "./pages/AddSailboatPage/AddSailboatPage.jsx";
import AddPowerboatPage from "./pages/AddPowerboatPage/AddPowerboatPage.jsx";
import AddSmallboatPage from "./pages/AddSmallboatPage/AddSmallboatPage.jsx";
import AddInflatablePage from "./pages/AddInflatablePage/AddInflatablePage.jsx";
import VehiclesPage from "./pages/VehiclesPage/VehiclesPage.jsx";

import { useAuth } from "./hooks/useAuth.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const LogOut = lazy(() => import("./pages/LogOut/LogOut.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    store.dispatch(refresh());
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<VehiclesPage />} />

            <Route
              path="/signup"
              element={
                <RestrictedRoute redirectTo="/" component={<SignUpPage />} />
              }
            />

            <Route
              path="/signin"
              element={
                <RestrictedRoute redirectTo="/" component={<SignInPage />} />
              }
            />

            <Route
              path="/logout"
              element={
                <PrivateRoute redirectTo="/signin" component={<LogOut />} />
              }
            />

            <Route
              path="/add-trailer"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<AddTrailerPage />}
                />
              }
            />
            <Route
              path="/add-sailboat"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<AddSailboatPage />}
                />
              }
            />
            <Route
              path="/add-powerboat"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<AddPowerboatPage />}
                />
              }
            />
            <Route
              path="/add-smallboat"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<AddSmallboatPage />}
                />
              }
            />
            <Route
              path="/add-inflatable"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<AddInflatablePage />}
                />
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
}
