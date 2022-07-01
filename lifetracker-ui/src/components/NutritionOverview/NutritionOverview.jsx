import * as React from "react"
import Loading from "components/Loading/Loading"
import { useNutritionContext } from "../../contexts/nutrition"
import { Link } from "react-router-dom"
import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import "./NutritionOverview.css"

export default function NutritionOverview() {
    const {error, isLoading, nutritions} = useNutritionContext()
    return (
        <div className="nutrition-overview">
            <div className="header">
                <h3>Overview</h3>
                <Link to="nutrition/create">
                    <button className="add-btn outline small aqua">
                        Record Nutrition
                    </button>
                </Link>
            </div>
            {error?.nutritions ? <span className="error">Something went wrong</span> : null}
            {isLoading ? <Loading /> : <NutritionFeed nutritions={nutritions}/>}
        </div>
    )
}