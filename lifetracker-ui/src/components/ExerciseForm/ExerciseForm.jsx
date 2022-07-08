import * as React from "react"
import "./ExerciseForm.css"
import { useExerciseContext } from "../../contexts/exercise"
import { useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"
import { useNavigate } from "react-router-dom"

export default function NutritionForm() {
    const {isLoading, setIsLoading, setError, exercises, setExercises} = useExerciseContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const [form, setForm] = React.useState({
        name: "",
        category: "",
        duration: 1,
        user_id: user.id,
        intensity: 1,
    })

    const handleOnInputChange = (event) => {

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    const handleOnSubmit = async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, form: null }))

        const {data, error} = await apiClient.createExercise({
                    name: form.name,
                    category: form.category,
                    duration: form.duration,
                    intensity: form.intensity,
                    user_id: user.id
                })
                
        if (error) setError((e) => ({ ...e, form: error }))
        if (data?.exercise) {
            setExercises([...exercises, data.exercise])
            navigate("/exercise")
        }
        
        setIsLoading(false)
    }

    return (
        <div className="exercise-form">
            <div className="input-field">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Exercise name" value={form.name} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="category">Category</label>
                <input type="text" name="category" placeholder="Exercise category" value={form.category} onChange={handleOnInputChange}/>
            </div>
            <div className="split-input-field">
                <div className="input-field">
                    <label htmlFor="duration">Duration (min)</label>
                    <input type="number" name="duration" placeholder={1} value={form.quantity} onChange={handleOnInputChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="intensity">Intensity (1-10)</label>
                    <input type="number" name="intensity" placeholder={1} value={form.intensity} onChange={handleOnInputChange}/>
                </div>
            </div>
            <button className="save-btn submit-exercise" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "Save"}
            </button>
        </div>
    )
}
