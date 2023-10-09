import { Fragment, lazy } from "react";
import { Routes, Route } from "react-router";

const App = lazy(() => import("./App"));

const AppWrapper = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </Fragment>
  );
};

export default AppWrapper;
