import * as React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { SleepContextProvider, useSleepContext } from "../../contexts/sleep"
import { useAuthContext } from "../../contexts/auth"
import SleepOverview from "../SleepOverview/SleepOverview"
import NotFound from "components/NotFound/NotFound"
import SleepNew from "components/SleepNew/SleepNew"
import SleepDetail from "components/SleepDetail/SleepDetail"
import apiClient from "../../services/apiClient"
import "./SleepPage.css"

export default function SleepContainer() {
    return (
        <SleepContextProvider>
            <SleepPage />
        </SleepContextProvider>
    )
}

function SleepPage() {
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {setIsLoading, setError, setInitialized, setSleeps} = useSleepContext()

    React.useEffect(() => {
        if (!user?.email) {
            navigate("/login", {state: {link: "/sleep"}})
        }
    }, [user, navigate])

    React.useEffect(async () => {
        if (user?.email) { 
            setIsLoading(true)
            const {data, error} = await apiClient.fetchUserSleeps()   
            
            if (error) setError((e) => ({ ...e, sleeps: error }))
    
            if (data?.sleeps) {
                setSleeps(data.sleeps)
            }
        }
        setIsLoading(false)
        setInitialized(true)
    }, [setIsLoading, setError, setInitialized, setSleeps])

    return (
        <div className="sleep-page">
            <div className="banner">
                <h1>Sleep</h1>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<SleepOverview />}/>
                    <Route path="/create" element={<SleepNew />} />
                    <Route path="/id/:sleepId" element={<SleepDetail />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </div>
        </div>
    )
}
