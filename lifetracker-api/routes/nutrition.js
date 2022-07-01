const express = require("express")
const Nutrition = require("../models/nutrition")
const router = express.Router()
const security = require("../middleware/security")

router.get("s", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get required information and create new user in the database
        const nutritions = Nutrition.fetchAllNutritionsByUserId(req.body?.user_id)
        return res.status(200).json({ nutritions })
    } catch (err) {
        next(err)
    }
})

router.post("/create", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get user email and password and try to authenticate

        const nutrition = await Nutrition.createNutrition(req.body)
        return res.status(200).json({ nutrition })
    } catch (err) {
        next(err)
    }
})

router.get("/:nutritionId", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get required information and create new user in the database
        const nutritionId = req.params.nutritionId
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)

        return res.status(201).json({ nutrition })
    } catch (err) {
        next(err)
    }
})


module.exports = router