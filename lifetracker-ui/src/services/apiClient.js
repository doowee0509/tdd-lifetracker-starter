import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetracker_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({endpoint, method ='GET', data= {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        }

        try {
            const res = await axios({url, method, data, headers})
            return {data: res.data, error: null}
        } catch (err) {
            console.error({errorResponse: err.response})
            const message = err?.response?.data?.error?.message
            return {data: null, error: message || String(err)}
        }
    }

    async fetchActivitySummary() {
        return await this.request({ endpoint: `activity`, method: `GET`})   
    }

    async fetchUserNutritions() {
        return await this.request({ endpoint: `nutrition`, method: `GET`})   
    }

    async fetchNutritionById(id) {
        return await this.request({ endpoint: `nutrition/${id}`, method: `GET`})
    }

    async createNutrition(creds) {
        return await this.request({ endpoint: `nutrition/create`, method: `POST`, data: creds })
    }

    async fetchUserSleeps() {
        return await this.request({ endpoint: `sleep`, method: `GET`})   
    }

    async fetchSleepById(id) {
        return await this.request({ endpoint: `sleep/${id}`, method: `GET`})
    }

    async createSleep(creds) {
        return await this.request({ endpoint: `sleep/create`, method: `POST`, data: creds })
    }

    async fetchUserExercises() {
        return await this.request({ endpoint: `exercise`, method: `GET`})   
    }

    async fetchExerciseById(id) {
        return await this.request({ endpoint: `exercise/${id}`, method: `GET`})
    }

    async createExercise(creds) {
        return await this.request({ endpoint: `exercises/create`, method: `POST`, data: creds })
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }
    async loginUser(creds) {
        return await this.request({endpoint: `auth/login`, method: `POST`, data:creds})
    }
    async signupUser(creds) {
        return await this.request({endpoint: `auth/register`, method: `POST`, data:creds})
    }
    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

// export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")
export default new ApiClient("http://localhost:3001")
