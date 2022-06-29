describe("config can come from env", function () {
    test("works", function () {
        process.env.SECRET_KEY = "abc"
        process.env.PORT = "5432"
        process.env.DATABASE_URL = "other"
        process.env.NODE_ENV = "test"

        const config = require("./config")
        expect(config.PORT).toEqual(5432)
        expect(config.SECRET_KEY).toEqual("abc")
        expect(config.BCRYPT_WORK_FACTOR).toEqual(13)
        expect(config.IS_TESTING).toEqual(true)
        expect(config.getDatabaseUri()).toEqual("other")

        delete process.env.SECRET_KEY
        delete process.env.PORT
        delete process.env.BCRYPT_WORK_FACTOR
        delete process.env.DATABASE_URL

        expect(config.getDatabaseUri()).toEqual("airbnb")
        process.env.NODE_ENV = "test"
        expect(config.getDatabaseUri()).toEqual("airbnb_test")
    })
})