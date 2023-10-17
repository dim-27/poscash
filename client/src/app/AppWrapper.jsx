import LoginAdmin from "@/pages/auth/LoginAdmin";
import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const App = lazy(() => import("./App"));
const Home = lazy(() => import("../pages/Home"));
const LoginAs = lazy(() => import("../pages/auth/LoginAs"));
const LoginCashier = lazy(() => import("../pages/auth/LoginCashier"));
const loginAdmin = lazy(() => import("../pages/auth/LoginAdmin"));
const RegisterCashier = lazy(() => import("../pages/auth/register"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const Sales = lazy(() => import("../pages/dashboard/Sales"));
const Report = lazy(() => import("../pages/dashboard/Report"));
const History = lazy(() => import("../pages/dashboard/History"));
const Cashier = lazy(() => import("../pages/dashboard/Cashier"))

const AppWrapper = () => {
  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<LoginAs />} />
            <Route path="login-cashier" element={<LoginCashier />} />
            <Route path="login-admin" element={<LoginAdmin />} />
            <Route path="register-cashier" element={<RegisterCashier />} />

            <Route path="dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="sales" element={<Sales />} />
              <Route path="report" element={<Report />} />
              <Route path="history" element={<History />} />
              <Route path="cashier" element={<Cashier/>} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default AppWrapper;
