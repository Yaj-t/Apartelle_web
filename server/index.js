const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()



app.use(express.json());
app.use(cookieParser());

const db = require('./models')

//Routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')
const roomTypeRouter = require('./routes/roomType')
const bookingRouter = require('./routes/booking')
const reviewsRouter = require('./routes/review');

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/room", roomRouter)
app.use("/roomType", roomTypeRouter)
app.use('/booking', bookingRouter)
app.use('/review', reviewsRouter);


db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log("Server running on port 3001")
})
})