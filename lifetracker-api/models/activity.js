const db = require("../db")
const { BadRequestError } = require("../utils/errors")

class Activity {
    static async getMaxSleep(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT MAX(hours) FROM sleeps WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        return results.rows[0]
    }

    static async getTotalExerciseTime(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT SUM(duration) FROM exercises WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        return results.rows[0]
    }

    static async getAverageCaloriesConsumed(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT AVG(calories) FROM nutrition WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        return results.rows[0]
    }
}

module.exports = Activity
