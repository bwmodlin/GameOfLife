const express = require('express')
const app = express()

const cors = require('cors')
const path = require("path")

const database = require('./utils/database.js')

app.use(cors())

app.use(express.json())
app.use(express.static('build'))

app.get('/api/presets', (request, response) =>
    database.getPresets((data) => response.json(data)))

app.get('*', (request, response) =>
    response.sendFile(path.resolve('build', 'index.html')))

const PORT = process.env.PORT || 3001
app.listen(PORT)