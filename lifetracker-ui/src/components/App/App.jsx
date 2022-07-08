import * as React from "react"
import Navbar from "../Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "components/RegistrationPage/RegistrationPage"
import NotFound from "components/NotFound/NotFound"
import ActivityPage from "components/ActivityPage/ActivityPage"
import { AuthContextProvider, useAuthContext } from "../../contexts/auth"
import NutritionPage from "../NutritionPage/NutritionPage"
import ExercisePage from "../ExercisePage/ExercisePage"
import SleepPage from "../SleepPage/SleepPage"
import apiClient from "../../services/apiClient"
import "./App.css"

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}

function App() {
  const {setUser, setError, setIsProcessing, setInitialized} = useAuthContext()

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (error?.response?.data?.error?.status !== 304) {
        setError((e) => ({ ...e, user: error }))
      }
      if (data?.user) {
        setUser(data.user)
        setError((e) => ({ ...e, user: null }))
      }
    }

    const token = localStorage.getItem("lifetracker_token")
    if (token) {
      apiClient.setToken(token)
      setIsProcessing(true)
      setError(null)
      fetchUser()
    }

    setInitialized(true)
    setIsProcessing(false)
  }, [setUser, setIsProcessing, setError, setInitialized])

  const handleLogout = async () => {
    await apiClient.logoutUser()
    setUser({})
    setError(null)
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Navbar handleLogout={handleLogout}/>
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage  />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/nutrition/*" element={<NutritionPage />} />
              <Route path="/sleep/*" element={<SleepPage />} />
              <Route path="/exercise/*" element={<ExercisePage />} />
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
