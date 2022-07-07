import * as React from "react"
import "./ExerciseNew.css"
import ExerciseForm from "../ExerciseForm/ExerciseForm"
export default function ExerciseNew() {

    return (
        <div className="exercise-new">
            <h2>Add Exercise</h2>
            <ExerciseForm />
        </div>
    )
}
