import * as React from "react"
import "./ActivityFeed.css"
import { useNavigate } from "react-router-dom"
import { useActivityContext } from "../../contexts/activity"
import SummaryStat from "components/SummaryStat/SummaryStat"

export default function ActivityFeed() {

    const {activity} = useActivityContext()
    console.log(activity)
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
                </div><div className="per-day">
                        <h4>Total Calories Per Day</h4>
                </div>
                <div className="summary-container">
                    {activity?.total?.sum ? <SummaryStat stat={activity?.total?.sum} label="Total Exercise Minutes" substat="" /> : null}
                    {activity?.avg?.avg ? <SummaryStat stat={activity?.avg?.avg} label="Avg Calories Consumed" substat="" /> : null}
                    {activity?.max?.max ? <SummaryStat stat={activity?.max?.max} label="Max sleep" substat="" /> : null}
                    { (activity?.max?.max === null && activity?.avg?.avg === null && activity?.total?.sum === null)? (<div className="empty">
                <h2 className="empty-message">Nothing here yet</h2>
            </div>) : null}
                </div>
            </div>
        </div>
    )
}