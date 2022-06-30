import * as React from "react"
import Navbar from "../Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import NotFound from "components/NotFound/NotFound"
import ActivityPage from "components/ActivityPage/ActivityPage"
import "./App.css"

export default function App() {
  const [auth, setAuth] = React.useState(false)
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Navbar auth={auth} setAuth={setAuth}/>
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<LoginPage auth={auth} setAuth={setAuth}/>} />
              <Route path="/register" element={<RegistrationPage auth={auth} setAuth={setAuth} />} />
              <Route path="/activity" element={<ActivityPage auth={auth}/>} />
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
