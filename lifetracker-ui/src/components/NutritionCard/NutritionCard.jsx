import * as React from "react"
import "./NutritionCard.css"
import { Link } from "react-router-dom"
import moment from "moment"

export default function NutritionCard({nutrition}) {

    return (
        <Link to={`/nutrition/id/${nutrition.id}`} >
            <div className="nutrition-card">
                <div className="card-header">
                    
                    <img src={nutrition?.imageUrl} alt="img" className="nutrition-image" />
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
                    <small className="nutrition-date">{moment(new Date(nutrition.created_at)).calendar()}</small>
                    <small className="nutrition-category">{nutrition.category}</small>
                </div>
            </div>
        </Link>
    )
}