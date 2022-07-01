import * as React from "react"
import { useNutritionContext } from "../../contexts/nutrition"
import "./NutritionFeed.css"

export default function NutritionFeed({nutritions}) {

    return (
        <div className="nutrition-feed">
            {nutritions.length ? 
            (<div className="empty">
                <h2 className="empty-message">Nothing here yet</h2>
            </div>) 
            : (<div className="empty"></div>)}
        </div>
    )
}