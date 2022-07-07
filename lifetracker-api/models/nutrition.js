const db = require("../db")
const { BadRequestError } = require("../utils/errors")
class Nutrition {

    static async createNutrition(creds) {
        //required fields are email and password, throw error if either are missing
        const requiredFields = ['name', 'category', 'quantity' ,'calories', 'imageUrl', 'user_id']
        requiredFields.forEach(field => {
            if (!creds.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
            if (creds.hasOwnProperty(field) && creds[field] === '') {
                throw new BadRequestError(`Cannot have empty ${field} in request body.`)
            }
        })

        const result = await db.query(`
            INSERT INTO nutrition (
                name,
                category,
                calories,
                image_url,
                user_id,
                quantity
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, category, calories, image_url, user_id, created_at, quantity;
        `,
        [creds.name, creds.category, creds.calories , creds.imageUrl, creds.user_id, creds.quantity]
        )

        return result.rows[0]
    }

    static async fetchNutritionById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM nutrition WHERE id = $1;", [id])
    
        return result.rows[0]
    }

    static async fetchAllNutritionsByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT * FROM nutrition WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        console.log(results.rows)
        return results.rows
    }
}

module.exports = Nutrition