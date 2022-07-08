const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Activity = require("../models/activity")

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get required information and create new user in the database
        const {user_id} = res.locals?.user
        const total = await Activity.getTotalExerciseTime(user_id)
        const avg = await Activity.getAverageCaloriesConsumed(user_id)
        const max = await Activity.getMaxSleep(user_id)
        return res.status(200).json({ activity: {total: total, avg: avg, max:max} })
    } catch (err) {
        next(err)
    }
})

module.exports = router