import * as React from "react"
import "./ExerciseCard.css"
import { Link } from "react-router-dom"
import moment from "moment"

export default function ExerciseCard({exercise}) {
    return (
        <Link to={`/exercise/id/${exercise.id}`}>

        <div className="exercise-card">
            <div className="card-header">                
                <h2 className="title exercise-name">
                    {exercise.name}
                </h2>
            </div>
            <div className="card-stats">
                <div className="card-stat">
                    <p>Duration</p>
                    <span className="exercise-calories">{exercise.duration}</span>
                </div>
                <div className="card-stat">
                    <p>Intensity</p>
                    <span className="exercise-quantity">{exercise.intensity}</span>
                </div>
            </div>
            <div className="card-meta">
                <small className="exercise-date">{moment(new Date(exercise.created_at)).calendar()}</small>
                <small className="exercise-category">{exercise.category}</small>
            </div>
        </div>
        </Link>
    )
}