import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const App = () => {
  return (
    <Fragment>
      <div className="h-screen">
        <Header />
        <div className="mx-auto pt-10">
          <div className="w-4/5 mx-auto">
            <Outlet />
            <Toaster />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
export default App;
