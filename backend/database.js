require("dotenv").config();

const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
})

const getPresets = (callback) => {
    const text = "SELECT name, board FROM public.presets"
    pool
        .query(text)
        .then((res) => {
                callback(res.rows)
            }
        )
}

module.exports = {getPresets}