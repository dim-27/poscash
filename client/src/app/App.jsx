import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Header from "../layout/Header"
import Footer from "../layout/Footer"

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className="h-screen mx-auto mt-20">
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  )
}
export default App
