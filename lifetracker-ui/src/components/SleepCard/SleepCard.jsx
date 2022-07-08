import * as React from "react"
import "./SleepCard.css"
import { Link } from "react-router-dom"

export default function SleepCard({sleep}) {
    const date = new Date(sleep.created_at.split("T")[0]).toDateString().split(" ")
    const start = sleep.start_time.split("T")[1].split(":")
    const end = sleep.end_time.split("T")[1].split(":")

    const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    } 

    return (
        <Link to={`/sleep/id/${sleep.id}`}>
            <div className="sleep-card">
                <div className="card-header">                
                    <h2 className="title sleep-name">
                        {`${date[1]} ${parseInt(date[2])}${nth(parseInt(date[2]))} ${date[3]}`}
                    </h2>
                </div>
                <div className="card-stats">
                    <div className="card-stat">
                        <p>Start Time</p>
                        <span className="sleep-calories">{start[0] >= 12 ? `${parseInt(start[0]) - 12}:${start[1]} PM` : `${start[0]}:${start[1]} AM`}</span>
                    </div>
                    <div className="card-stat">
                        <p>End Time</p>
                        <span className="sleep-quantity">{end[0] >= 12 ? `${parseInt(end[0]) - 12}:${end[1]} PM` : `${end[0]}:${end[1]} AM`}</span>
                    </div>
                </div>
                <div className="card-meta">
                    <small className="sleep-date">{sleep.hours} hours </small>
                </div>
            </div>
        </Link>
    )
}