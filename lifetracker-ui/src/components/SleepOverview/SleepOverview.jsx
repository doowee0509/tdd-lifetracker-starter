import * as React from "react"
import Loading from "components/Loading/Loading"
import { useSleepContext } from "../../contexts/sleep"
import { Link } from "react-router-dom"
import SleepFeed from "components/SleepFeed/SleepFeed"
import "./SleepOverview.css"

export default function SleepOverview() {
    const {error, isLoading, sleeps} = useSleepContext()
    return (
        <div className="sleep-overview">
            <div className="header">
                <h3>Overview</h3>
                <Link to="create">
                    <button className="add-btn outline small blue">
                        Log Sleep
                    </button>
                </Link>
            </div>
            {error?.sleeps ? <span className="error">Something went wrong</span> : null}
            {isLoading ? <Loading /> : <SleepFeed sleeps={sleeps}/>}
        </div>
    )
}