import * as React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ExerciseContextProvider, useExerciseContext } from "../../contexts/exercise"
import { useAuthContext } from "../../contexts/auth"
import ExerciseOverview from "../ExerciseOverview/ExerciseOverview"
import NotFound from "components/NotFound/NotFound"
import ExerciseNew from "components/ExerciseNew/ExerciseNew"
import ExerciseDetail from "components/ExerciseDetail/ExerciseDetail"
import apiClient from "../../services/apiClient"
import "./ExercisePage.css"

export default function ExerciseContainer() {
    return (
        <ExerciseContextProvider>
            <ExercisePage />
        </ExerciseContextProvider>
    )
}

function ExercisePage() {
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {setIsLoading, setError, setInitialized, setExercises} = useExerciseContext()

    React.useEffect(() => {
        if (!user?.email) {
            navigate("/login", {state: {link: "/exercise"}})
        }
    }, [user, navigate])

    React.useEffect(async () => {
        if (user?.email) { 
            setIsLoading(true)
            const {data, error} = await apiClient.fetchUserExercises()   
            
            if (error) setError((e) => ({ ...e, exercises: error }))
    
            if (data?.exercises) {
                setExercises(data.exercises)
            }
        }
        setIsLoading(false)
        setInitialized(true)
    }, [setIsLoading, setError, setInitialized, setExercises])

    return (
        <div className="exercise-page">
            <div className="banner">
                <h1>Exercise</h1>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<ExerciseOverview />}/>
                    <Route path="/create" element={<ExerciseNew />} />
                    <Route path="/id/:exerciseId" element={<ExerciseDetail />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </div>
        </div>
    )
}
