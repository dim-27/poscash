import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Header from "../layout/Header"
import Footer from "../layout/Footer"

const App = () => {
  return (
    <Fragment>
      <div className="h-screen">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  )
}
export default App
