const express = require("express")
const Sleep = require("../models/sleep")
const router = express.Router()
const security = require("../middleware/security")

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        const {user_id} = res.locals?.user
        //get required information and create new user in the database
        const sleeps = await Sleep.listSleepsForUser(user_id)
        return res.status(200).json({ sleeps })
    } catch (err) {
        next(err)
    }
})

router.post("/create", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get user email and password and try to authenticate
        const sleep = await Sleep.createSleep(req.body)
        return res.status(200).json({ sleep })
    } catch (err) {
        next(err)
    }
})

router.get("/:sleepId", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get required information and create new user in the database
        const sleepId = req.params.sleepId
        const sleep = await Sleep.fetchSleepById(sleepId)

        return res.status(201).json({ sleep })
    } catch (err) {
        next(err)
    }
})


module.exports = router