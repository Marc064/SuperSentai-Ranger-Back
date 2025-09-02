const express = require('express')
const cors = require('cors')

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(cors())

app.use('/api/sentai', require('./router/sentai'))
app.use('/api/ranger', require('./router/ranger'))
app.use('/api/kamen', require('./router/kamen'))

app.listen(app.get('PORT'), () => console.log(`Server already in http://localhost:${app.get('PORT')}`))