import * as React from "react"
import "./NutritionForm.css"
import { useNutritionContext } from "../../contexts/nutrition"
import { useAuthContext } from "../../contexts/auth"
import apiClient from "../../services/apiClient"
import { useNavigate } from "react-router-dom"

export default function NutritionForm() {
    const {isLoading, setIsLoading, setError, nutritions, setNutritions} = useNutritionContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const [errors, setErrors] = React.useState("")

    const [form, setForm] = React.useState({
        name: "",
        category: "",
        user_id: user.id,
        quantity: 0,
        calories: 0,
        imageUrl: ""
    })

    const handleOnInputChange = (event) => {

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    const handleOnSubmit = async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, form: null }))

        if(form.calories < 0){
            setErrors("Calories cannot be negative")
            setIsLoading(false)
            return
        }
        if(form.category == ""){
            setErrors("Please select a category")
            setIsLoading(false)
            return
        }

        if(form.name == ""){
            setErrors("Please give product a name")
            setIsLoading(false)
            return
        }

        if(form.imageUrl == ""){
            setErrors("Please give an image url")
            setIsLoading(false)
            return
        }

        const {data, error} = await apiClient.createNutrition({
                    name: form.name,
                    category: form.category,
                    quantity: form.quantity,
                    calories: form.calories,
                    imageUrl: form.imageUrl,
                    user_id: user.id
                })
                
        if (error) setError((e) => ({ ...e, form: error }))
        if (data?.nutrition) {
            setNutritions([...nutritions, data.nutrition])
            navigate("/nutrition")
        }
        
        setIsLoading(false)
    }

    return (
        <div className="nutrition-form">
            {errors === "" ? null : <span  className="error">{errors}</span>}
            <div className="input-field">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Nutrition name" value={form.name} onChange={handleOnInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="category">Category</label>
                <input type="text" name="category" placeholder="Category name" value={form.category} onChange={handleOnInputChange}/>
            </div>
            <div className="split-input-field">
                <div className="input-field">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleOnInputChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="calories">Calories</label>
                    <input type="number" name="calories" placeholder="Calories" value={form.calories} onChange={handleOnInputChange}/>
                </div>
            </div>
            <div className="input-field">
                <label htmlFor="imageUrl">Image Url</label>                
                <input type="text" name="imageUrl" placeholder="http://www.food-image.com/1" value={form.imageUrl} onChange={handleOnInputChange}/>
                <button className="save-btn submit-nutrition" disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? "Loading..." : "Save"}
                </button>
            </div>
        </div>
    )
}
