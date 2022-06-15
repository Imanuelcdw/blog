const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const { customError } = require('./middlewares/error')
const { protect } = require('./middlewares/auth')

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html')
})
app.use('/api/post', protect, postRouter)
app.use('/api/user', userRouter)
app.use(customError)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
