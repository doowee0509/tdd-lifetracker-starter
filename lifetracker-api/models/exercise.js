const db = require("../db")
const { BadRequestError } = require("../utils/errors")
class Exercise {

    static async createExercise(creds) {
        //required fields are email and password, throw error if either are missing
        const requiredFields = ['name', 'category', 'duration' ,'intensity', 'user_id']
        requiredFields.forEach(field => {
            if (!creds.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
            if (creds.hasOwnProperty(field) && creds[field] === '') {
                throw new BadRequestError(`Cannot have empty ${field} in request body.`)
            }
        })

        const result = await db.query(`
            INSERT INTO exercises (
                name,
                category,
                duration,
                user_id,
                intensity
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, category, duration, user_id, created_at, intensity;
        `,
        [creds.name, creds.category, creds.duration, creds.user_id, creds.intensity]
        )

        return result.rows[0]
    }

    static async fetchExerciseById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM exercises WHERE id = $1;", [id])
    
        return result.rows[0]
    }

    static async listExercisesForUser(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT * FROM exercises WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        return results.rows
    }
}

module.exports = Exercise