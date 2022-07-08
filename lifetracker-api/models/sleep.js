const db = require("../db")
const { BadRequestError } = require("../utils/errors")
class Sleep {

    static async createSleep(creds) {
        //required fields are email and password, throw error if either are missing
        const requiredFields = ['start_time', 'end_time', 'user_id']
        requiredFields.forEach(field => {
            if (!creds.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
            if (creds.hasOwnProperty(field) && creds[field] === '') {
                throw new BadRequestError(`Cannot have empty ${field} in request body.`)
            }
        })
        const hours = Math.floor(Math.abs(new Date(creds.start_time) - new Date(creds.end_time)) / 36e5);

        const result = await db.query(`
            INSERT INTO sleeps (
                start_time,
                end_time,
                user_id,
                hours
            )
            VALUES ($1, $2, $3, $4)
            RETURNING id, start_time, end_time, hours, user_id, created_at;
        `,
        [creds.start_time, creds.end_time, creds.user_id, hours]
        )

        return result.rows[0]
    }

    static async fetchSleepById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM sleeps WHERE id = $1;", [id])
    
        return result.rows[0]
    }

    static async listSleepsForUser(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT * FROM sleeps WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        return results.rows
    }
}

module.exports = Sleep