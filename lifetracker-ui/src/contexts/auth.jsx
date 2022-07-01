import { createContext, useState, useContext } from "react"

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})

    const authValue = {user, setUser, errors, setErrors, initialized, setInitialized, isProcessing, setIsProcessing}
    return (
        <AuthContext.Provider value ={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)