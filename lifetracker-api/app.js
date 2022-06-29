const express = require("express")
const {BadRequestError, NotFoundError} = require("./utils/errors")
const authRoutes = require("./routes/auth")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(morgan("tiny"))
app.use(express.json())

app.use("/auth", authRoutes)

app.get("/",(req, res, next) => {
    res.status(200).json({"ping":"pong"})
})

app.get((req, res, next) => {
    next(new NotFoundError())
})

app.get((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status },
    })
})

module.exports = app