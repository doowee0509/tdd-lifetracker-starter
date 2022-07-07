import * as React from "react"
import Loading from "components/Loading/Loading"
import { useExerciseContext } from "../../contexts/exercise"
import { Link } from "react-router-dom"
import ExerciseFeed from "components/ExerciseFeed/ExerciseFeed"
import "./ExerciseOverview.css"

export default function ExerciseOverview() {
    const {error, isLoading, exercises} = useExerciseContext()
    return (
        <div className="exercise-overview">
            <div className="header">
                <h3>Overview</h3>
                <Link to="create">
                    <button className="add-btn outline small gold">
                        Add Exercise
                    </button>
                </Link>
            </div>
            {error?.exercises ? <span className="error">Something went wrong</span> : null}
            {isLoading ? <Loading /> : <ExerciseFeed exercises={exercises}/>}
        </div>
    )
}