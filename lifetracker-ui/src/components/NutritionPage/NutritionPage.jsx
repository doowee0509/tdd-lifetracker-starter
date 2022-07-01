import * as React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { NutritionContextProvider, useNutritionContext } from "../../contexts/nutrition"
import { useAuthContext } from "../../contexts/auth"
import NutritionOverview from "../NutritionOverview/NutritionOverview"
import NotFound from "components/NotFound/NotFound"
import NutritionNew from "components/NutritionNew/NutritionNew"
import NutritionDetail from "components/NutritionDetail/NutritionDetail"
import apiClient from "../../services/apiClient"
import "./NutritionPage.css"

export default function NutritionContainer() {
    return (
        <NutritionContextProvider>
            <NutritionPage />
        </NutritionContextProvider>
    )
}

function NutritionPage() {
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {setIsLoading, setError, setInitialized, setNutritions} = useNutritionContext()

    React.useEffect(() => {
        if (!user?.email) {
            navigate("/login", {state: {link: "/nutrition"}})
        }
    }, [user, navigate])

    React.useEffect(async () => {
        if (user?.email) { 
            setIsLoading(true)
            const {data, error} = await apiClient.fetchUserNutritions()   
            
            if (error) setError((e) => ({ ...e, nutritions: error }))
    
            if (data?.nutritions) {
                setNutritions(data.nutritions)
            }
        }
        setIsLoading(false)
        setInitialized(true)
    }, [setIsLoading, setError, setInitialized, setNutritions])

    return (
        <div className="nutrition-page">
            <div className="banner">
                <h1>Nutrition</h1>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<NutritionOverview />}/>
                    <Route path="/nutrition/create" element={<NutritionNew />} />
                    <Route path="/nutrition/id/:nutritionId" element={<NutritionDetail />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </div>
        </div>
    )
}
