const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(cors())

app.listen(app.get('PORT'), ()=> console.log(`Server already in http://localhost:${app.get('PORT')}`) )