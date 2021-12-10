require("dotenv").config();

const { Pool } = require('pg')

const pool = new Pool()

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