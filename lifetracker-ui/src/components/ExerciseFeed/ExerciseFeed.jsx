import * as React from "react"
import { useExerciseContext } from "../../contexts/exercise"
import ExerciseCard from "components/ExerciseCard/ExerciseCard"
import "./ExerciseFeed.css"

export default function ExerciseFeed({exercises}) {
    return (
        <div className="exercise-feed">
            {!exercises?.length ? 
            (<div className="empty">
                <h2 className="empty-message">Nothing here yet</h2>
            </div>) 
            : (exercises?.map((item) => {
                return <ExerciseCard exercise={item} key={item.id}/>
            }))}
        </div>
    )
}