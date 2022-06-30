import * as React from "react"
import Navbar from "../Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import axios from "axios"
import "./App.css"

export default function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              {/* <Route path="*" element={<NotFound />}/> */}
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
