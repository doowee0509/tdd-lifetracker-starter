import * as React from "react"
import "./NutritionDetail.css"
import { useNutritionContext } from "../../contexts/nutrition"
import apiClient from "../../services/apiClient"
import NotFound from "components/NotFound/NotFound"
import NutritionCard  from "components/NutritionCard/NutritionCard"
import {useParams} from "react-router-dom"

export default function NutritionDetail() {
    const [nutrition, setNutrition] = React.useState(null)
    const {setIsLoading, setError, isLoading} = useNutritionContext()
    const {nutritionId} = useParams()

    React.useEffect(async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, nutritionCard: null }))

        const {data, error} = await apiClient.fetchNutritionById(nutritionId)
                
        if (error) setError((e) => ({ ...e, nutritionCard: error }))

        if (data?.nutrition) {
            setNutrition(data.nutrition)
        }
        
        setIsLoading(false)

    }, [setIsLoading, setError, setNutrition])

    if (isLoading) {
        return (
            <h1 className="loading">Loading...</h1>
        )
    }
    return (
        <div className="nutrition-detail">
            {nutrition ? <NutritionCard nutrition={nutrition} /> : <NotFound />}
        </div>
    )
}