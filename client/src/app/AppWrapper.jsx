import { Fragment, lazy } from "react"
import { Routes, Route } from "react-router"

const App = lazy(() => import("./App"))
const Home = lazy(() => import("../page/Home"))

const AppWrapper = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default AppWrapper
