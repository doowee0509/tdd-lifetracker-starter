const express = require("express")
const Exercise = require("../models/exercise")
const router = express.Router()
const security = require("../middleware/security")

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        const {user_id} = res.locals?.user
        //get required information and create new user in the database
        const exercises = await Exercise.listExercisesForUser(user_id)
        return res.status(200).json({ exercises })
    } catch (err) {
        next(err)
    }
})

router.post("/create", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get user email and password and try to authenticate
        const exercise = await Exercise.createExercise(req.body)
        return res.status(200).json({ exercise })
    } catch (err) {
        next(err)
    }
})

router.get("/:exerciseId", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get required information and create new user in the database
        const exerciseId = req.params.exerciseId
        const exercise = await Exercise.fetchExerciseById(exerciseId)

        return res.status(201).json({ exercise })
    } catch (err) {
        next(err)
    }
})


module.exports = router