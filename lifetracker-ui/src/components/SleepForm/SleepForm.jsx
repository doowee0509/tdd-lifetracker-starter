import * as React from "react"
import "./SleepForm.css"
import { useSleepContext } from "../../contexts/sleep"
import { useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"
import { useNavigate } from "react-router-dom"

export default function NutritionForm() {
    const {isLoading, setIsLoading, setError, sleeps, setSleeps} = useSleepContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const [form, setForm] = React.useState({
        start_time: "",
        end_time: "",
        user_id: user.id
    })

    const handleOnInputChange = (event) => {

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
        console.log(form)
    }
    
    const handleOnSubmit = async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, form: null }))

        const {data, error} = await apiClient.createSleep({
                    start_time: form.start,
                    end_time: form.end,
                    user_id: user.id
                })
                
        if (error) setError((e) => ({ ...e, form: error }))
        if (data?.sleep) {
            setSleeps([...sleeps, data.sleep])
            navigate("/sleep")
        }
        
        setIsLoading(false)
    }

    return (
        <div className="sleep-form">
            <div className="input-field">
                <label htmlFor="start">Start Time</label>
                <input type="datetime-local" name="start" value={form.start} onChange={handleOnInputChange}/>

            </div>
            <div className="input-field">
                <label htmlFor="end">End Time</label>
                <input type="datetime-local" name="end" value={form.end} onChange={handleOnInputChange}/>
            </div>
            <button className="save-btn submit-sleep" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "Save"}
            </button>
        </div>
    )
}
