import * as React from "react"
import Loading from "components/Loading/Loading"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"

export default function ActivityPage() {
    const {user, isProcessing} = useAuthContext()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!user?.email) {
            navigate("/login", {state: {link: "/activity"}})
        }
    }, [user, navigate])
    return (
        <div className="activity-page">
            {isProcessing ? <Loading /> : <ActivityFeed />}
        </div>
    )
}