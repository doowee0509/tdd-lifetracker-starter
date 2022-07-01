import * as React from "react"
import { useNutritionContext } from "../../contexts/nutrition"
import NutritionCard from "components/NutritionCard/NutritionCard"
import "./NutritionFeed.css"

export default function NutritionFeed({nutritions}) {
    console.log(nutritions)
    return (
        <div className="nutrition-feed">
            {!nutritions.length ? 
            (<div className="empty">
                <h2 className="empty-message">Nothing here yet</h2>
            </div>) 
            : (nutritions?.map((item) => {
                return <NutritionCard nutrition={item} key={item.id}/>
            }))}
        </div>
    )
}