import * as React from "react"
import "./ExerciseCard.css"

export default function ExerciseCard({exercise}) {
    return (
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
                <small className="exercise-date">{exercise.created_at}</small>
                <small className="exercise-category">{exercise.category}</small>
            </div>
        </div>
    )
}