import { createContext, useState, useContext } from "react"

const ExerciseContext = createContext(null)

export const ExerciseContextProvider = ({children}) => {
    const [xercises, setExercises] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const ExerciseValue = {xercises, setExercises, error, setError, initialized, setInitialized, isLoading, setIsLoading}
    return (
        <ExerciseContext.Provider value ={ExerciseValue}>
            <>{children}</>
        </ExerciseContext.Provider>
    )
}

export const useExerciseContext = () => useContext(ExerciseContext)