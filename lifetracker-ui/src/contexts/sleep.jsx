import { createContext, useState, useContext } from "react"

const SleepContext = createContext(null)

export const SleepContextProvider = ({children}) => {
    const [sleeps, setSleeps] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const SleepValue = {sleeps, setSleeps, error, setError, initialized, setInitialized, isLoading, setIsLoading}
    return (
        <SleepContext.Provider value ={SleepValue}>
            <>{children}</>
        </SleepContext.Provider>
    )
}

export const useSleepContext = () => useContext(SleepContext)