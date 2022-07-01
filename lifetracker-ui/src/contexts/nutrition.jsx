import { createContext, useState, useContext } from "react"

const NutritionContext = createContext(null)

export const NutritionContextProvider = ({children}) => {
    const [nutritions, ] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const nutritionValue = {nutritions, setNutritions, error, setError, initialized, setInitialized, isLoading, setIsLoading}
    return (
        <NutritionContext.Provider value ={nutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    )
}

export const useNutritionContext = () => useContext(NutritionContext)