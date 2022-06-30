const db = require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    }

    static async login(creds) {
        //required fields are email and password, throw error if either are missing
        const requiredFields = ["email", 'password']
        requiredFields.forEach(field => {
            if (!creds.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        //looking the user in the db by email
        const user = await User.fetchUserByEmail(creds.email)
        if (user) {
            const isValid = await bcrypt.compare(creds.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            }
        }
        // if the user is found, compare the password with the submitted password
        // if they match, return user
        // else throw an error
        throw new UnauthorizedError("Invalid email/password")
    }

    static async register(creds) {
        //user should submit email, pw, resvp status and # of guest
        // if any of the field are missing, throw an error
        const requiredFields = ["email", 'username', 'first_name', 'last_name', 'password']
        requiredFields.forEach(field => {
            if (!creds.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            } 
            if (creds.hasOwnProperty(field) && creds[field] === '') {
                throw new BadRequestError(`Cannot have empty ${field} in request body.`)
            }
        })
        
        if(creds.email.indexOf('@') <= 0) {
            throw new BadRequestError('Invalid email')
        }
        // make sure no user in db exist with that email
        // if user exist, throw an error
        const existingUser = await User.fetchUserByEmail(creds.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${creds.email}`)
        }
        
        const results = await db.query("SELECT username FROM users;")
        const usernames = results?.rows
        if (usernames.indexOf(creds.username) !== -1) {
            throw new BadRequestError(`Duplicate username: ${creds.username}`)
        }
        // hash user password
        
        const hashedPassword = await bcrypt.hash(creds.password, BCRYPT_WORK_FACTOR)
        // lowercase email
        const lowercasedEmail = creds.email.toLowerCase()
        //create new user in the db with given info
        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                username
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, password, first_name, last_name, username, created_at;
        `,
        [lowercasedEmail, hashedPassword, creds.first_name, creds.last_name, creds.username]
        )
        //return user
        console.log(User.makePublicUser(result.rows[0]))
        return User.makePublicUser(result.rows[0])
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User