import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './Routers/userRouter.js'
import employeeRouter from './Routers/employeeRouter.js'
import postRouter from './Routers/postRouter.js'
import mongoose from 'mongoose'


const app = express()


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main().then(console.log('connected to db')).catch(err => console.log(err));


app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'));

app.use('/users',userRouter)
app.use('/employees',employeeRouter)
app.use('/posts',postRouter)

const PORT = process.env.PORT || 3000 

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})






