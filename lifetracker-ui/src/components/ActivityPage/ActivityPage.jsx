import * as React from "react"
import Loading from "components/Loading/Loading"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"
import { ActivityContextProvider, useActivityContext } from "../../contexts/activity"
import apiClient from "../../services/apiClient"

export default function ActivityContainer() {
    return (
        <ActivityContextProvider>
            <ActivityPage />
        </ActivityContextProvider>
    )
}

function ActivityPage() {
    const {isLoading, setInitialized, setIsLoading, setError, setActivity} = useActivityContext()
    const {user, isProcessing} = useAuthContext()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!user?.email) {
            navigate("/login", {state: {link: "/activity"}})
        }
    }, [user, navigate])

    React.useEffect(async () => {
        if (user?.email) { 
            setIsLoading(true)
            const {data, error} = await apiClient.fetchActivitySummary()   
            
            if (error) setError((e) => ({ ...e, activity: error }))
    
            if (data?.activity) {
                setActivity(data.activity)
            }
        }
        setIsLoading(false)
        setInitialized(true)
    }, [setIsLoading, setError, setInitialized, setActivity])

    return (
        <div className="activity-page">
            {isProcessing ? <Loading /> : <ActivityFeed />}
        </div>
    )
}