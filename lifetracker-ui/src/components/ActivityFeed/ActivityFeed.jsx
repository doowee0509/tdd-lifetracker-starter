import * as React from "react"
import "./ActivityFeed.css"
import { useNavigate } from "react-router-dom"

export default function ActivityFeed() {

    const navigate = useNavigate()

    const handleOnAdd = (num) => {
        if (num === 1) {
            navigate("/exercise/create")
        } else if (num === 2) {
            navigate("/sleep/create")
        } else if (num === 3) {
            navigate("/nutrition/create")
        }
    }
    return (
        <div className="activity-feed">
            <div className="content">
                <div className="actions">
                    <h2 className="heading">Activity Feed</h2>
                    <div className="add-btns">
                            <button onClick={() => handleOnAdd(1)} className="add-btn outline small gold">Add Exercise</button>
                            <button onClick={() => handleOnAdd(2)} className="add-btn outline small blue">Log Sleep</button>
                            <button onClick={() => handleOnAdd(3)} className="add-btn outline small aqua">Record Nutrition</button>
                    </div>
                </div>
                <div className="per-category">
                        <h4>Average Calories Per Category</h4>
                </div>
            </div>
        </div>
    )
}