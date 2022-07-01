import * as React from "react"
import "./NutritionNew.css"
import NutritionForm from "../NutritionForm/NutritionForm"
export default function NutritionNew() {

    return (
        <div className="nutrition-new">
            <h2>Record Nutrition</h2>
            <NutritionForm />
        </div>
    )
}
