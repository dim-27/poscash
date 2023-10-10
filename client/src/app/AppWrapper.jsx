import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const App = lazy(() => import("./App"));
const LoginAs = lazy(() => import("../pages/auth/LoginAs"));
const RegisterAs = lazy(() => import("../pages/auth/RegisterAs"));
const LoginCashier = lazy(() => import("../pages/auth/LoginCashier"));
const RegisterCashier = lazy(() => import("../pages/auth/RegisterCashier"));

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<LoginAs />} />
            <Route path="/register" element={<RegisterAs />} />
            <Route path="/login-cashier" element={<LoginCashier />} />
            <Route path="/register-cashier" element={<RegisterCashier />} />
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default AppWrapper;
