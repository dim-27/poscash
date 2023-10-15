import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Header from "../layout/Header"
import Footer from "../layout/Footer"

const App = () => {
  return (
    <Fragment>
      <div className="h-screen">
        <Header />
        <div className="h-[92vh]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}
export default App
