import express from 'express'
import cors from 'cors'

import products from"./product";

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.use('/product', products);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})
