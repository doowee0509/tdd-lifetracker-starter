import * as React from "react"
import "./NutritionCard.css"

export default function NutritionCard({nutrition}) {

    return (
        <div className="nutrition-card">
            <div className="card-header">
                <img src="https://static1.personality-database.com/profile_images/7e516ec0502f4fb7ae79fe1722228994.png" alt="nutrition image" className="nutrition-image" />
                <h2 className="title nutrition-name">
                    {nutrition.name}
                </h2>
            </div>
            <div className="card-stats">
                <div className="card-stat">
                    <p>Calories</p>
                    <span className="nutrition-calories">{nutrition.calories}</span>
                </div>
                <div className="card-stat">
                    <p>Quantity</p>
                    <span className="nutrition-quantity">{1}</span>
                </div>
            </div>
            <div className="card-meta">
                <small className="nutrition-date">{nutrition.created_at}</small>
                <small className="nutrition-category">{nutrition.category}</small>
            </div>
        </div>
    )
}