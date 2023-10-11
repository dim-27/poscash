import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Header from "../layout/Header"
import Footer from "../layout/Footer"

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className="pt-20 h-max">
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  )
}
export default App
