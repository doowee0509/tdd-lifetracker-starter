import * as React from "react"
import "./NutritionForm.css"
import { useNutritionContext } from "../../contexts/nutrition"
import { useAuthContext } from "../../contexts/auth"

export default function NutritionForm() {
    const {isLoading} = useNutritionContext()
    const {user} = useAuthContext()
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
        
        if (form.passwordConfirm === "") {
            return
        }

        const {data, error} = await apiClient.signupUser({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    password: form.password,
                    username: form.username
                })
                
        if (error) setError((e) => ({ ...e, form: error }))
        if (data?.user) {
            apiClient.setToken(data.token)
            setUser(data?.user)
            navigate("/activity")
        }
        
        setIsLoading(false)
    }

    return (
        <div className="nutrition-form">
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
                    <label htmlFor="category">Category</label>
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
