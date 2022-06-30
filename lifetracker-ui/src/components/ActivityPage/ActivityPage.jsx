import * as React from "react"
import Loading from "components/Loading/Loading"
import ActivityFeed from "components/ActivityFeed/ActivityFeed"
import { useNavigate } from "react-router-dom"

export default function ActivityPage(props) {
    const [isProcessing, setIsProcessing] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!props.auth) {
            navigate("/login", {state: {link: "/activity"}})
        }
    }, [props.auth, navigate])
    return (
        <div className="activity-page">
            {isProcessing ? <Loading /> : <ActivityFeed />}
        </div>
    )
}