import { createContext, useState, useContext } from "react"

const ExerciseContext = createContext(null)

export const ExerciseContextProvider = ({children}) => {
    const [exercises, setExercises] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const ExerciseValue = {exercises, setExercises, error, setError, initialized, setInitialized, isLoading, setIsLoading}
    return (
        <ExerciseContext.Provider value ={ExerciseValue}>
            <>{children}</>
        </ExerciseContext.Provider>
    )
}

export const useExerciseContext = () => useContext(ExerciseContext)