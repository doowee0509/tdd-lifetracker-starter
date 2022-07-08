import * as React from "react"
import "./SleepDetail.css"
import { useSleepContext } from "../../contexts/sleep"
import apiClient from "../../services/apiClient"
import NotFound from "components/NotFound/NotFound"
import SleepCard  from "components/SleepCard/SleepCard"
import {useParams} from "react-router-dom"

export default function SleepDetail() {
    const [sleep, setSleep] = React.useState(null)
    const {setIsLoading, setError, isLoading} = useSleepContext()
    const {sleepId} = useParams()

    React.useEffect(async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, sleepCard: null }))

        const {data, error} = await apiClient.fetchSleepById(sleepId)
                
        if (error) setError((e) => ({ ...e, sleepCard: error }))

        if (data?.sleep) {
            setSleep(data.sleep)
        }
        
        setIsLoading(false)

    }, [setIsLoading, setError, setSleep])

    if (isLoading) {
        return (
            <h1 className="loading">Loading...</h1>
        )
    }
    return (
        <div className="sleep-detail">
            {sleep ? <SleepCard sleep={sleep} /> : <NotFound />}
        </div>
    )
}