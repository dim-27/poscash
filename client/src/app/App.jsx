import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const App = () => {
  return (
    <Fragment>
      <div className="h-screen">
        <div className="h-[8vh]">
          <Header />
        </div>
        <div className="w-11/12 h-[92vh] mx-auto">
          <Outlet />
          <Toaster />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
export default App;
