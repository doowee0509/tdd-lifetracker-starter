import * as React from "react"
import { useSleepContext } from "../../contexts/sleep"
import SleepCard from "components/SleepCard/SleepCard"
import "./SleepFeed.css"

export default function SleepFeed({sleeps}) {
    return (
        <div className="sleep-feed">
            {!sleeps?.length ? 
            (<div className="empty">
                <h2 className="empty-message">Nothing here yet</h2>
            </div>) 
            : (sleeps?.map((item) => {
                return <SleepCard sleep={item} key={item.id}/>
            }))}
        </div>
    )
}