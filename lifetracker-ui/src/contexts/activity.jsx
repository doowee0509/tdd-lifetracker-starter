import { createContext, useState, useContext } from "react"

const ActivityContext = createContext(null)

export const ActivityContextProvider = ({children}) => {
    const [activity, setActivity] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const ActivityValue = {activity, setActivity, error, setError, initialized, setInitialized, isLoading, setIsLoading}
    return (
        <ActivityContext.Provider value ={ActivityValue}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () => useContext(ActivityContext)