import * as React from "react"
import "./ExerciseDetail.css"
import { useExerciseContext } from "../../contexts/exercise"
import apiClient from "../../services/apiClient"
import NotFound from "components/NotFound/NotFound"
import ExerciseCard  from "components/ExerciseCard/ExerciseCard"
import {useParams} from "react-router-dom"

export default function ExerciseDetail() {
    const [exercise, setExercise] = React.useState(null)
    const {setIsLoading, setError, isLoading} = useExerciseContext()
    const {exerciseId} = useParams()

    React.useEffect(async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, exerciseCard: null }))

        const {data, error} = await apiClient.fetchExerciseById(exerciseId)
                
        if (error) setError((e) => ({ ...e, exerciseCard: error }))

        if (data?.exercise) {
            setExercise(data.exercise)
        }
        
        setIsLoading(false)

    }, [setIsLoading, setError, setExercise])

    if (isLoading) {
        return (
            <h1 className="loading">Loading...</h1>
        )
    }
    return (
        <div className="exercise-detail">
            {exercise ? <ExerciseCard exercise={exercise} /> : <NotFound />}
        </div>
    )
}