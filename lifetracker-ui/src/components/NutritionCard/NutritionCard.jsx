import * as React from "react"
import "./NutritionCard.css"

export default function NutritionCard({nutrition}) {
    const source = nutrition.imageUrl ? nutrition.imageUrl : "https://t4.ftcdn.net/jpg/01/15/52/31/360_F_115523122_e4ry4EKsouP9kl2auNN1wSREoJq3kdcE.jpg"
    return (
        <div className="nutrition-card">
            <div className="card-header">
                
                <img src={source} alt="nutrition image" className="nutrition-image" />
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
                    <span className="nutrition-quantity">{nutrition.quantity}</span>
                </div>
            </div>
            <div className="card-meta">
                <small className="nutrition-date">{nutrition.created_at}</small>
                <small className="nutrition-category">{nutrition.category}</small>
            </div>
        </div>
    )
}