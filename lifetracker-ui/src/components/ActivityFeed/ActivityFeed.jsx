import * as React from "react"
import "./ActivityFeed.css"

export default function ActivityFeed() {
    return (
        <div className="activity-feed">
            <div className="content">
                <div className="actions">
                    <h2 className="heading">Activity Feed</h2>
                    <div className="add-btns">
                        <button className="add-btn outline small gold">Add Exercise</button>
                        <button className="add-btn outline small blue">Log Sleep</button>
                        <button className="add-btn outline small aqua">Record Nutrition</button>
                    </div>
                </div>
                <div className="per-category">
                        <h4>Average Calories Per Category</h4>
                </div>
            </div>
        </div>
    )
}