import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import keywordRouter from './router/keyword.router'
import authRouter from './router/auth.router'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose'
import { errorHandler } from '@saigon/common'
import { NotFoundError } from '@saigon/common'
import { currentUser } from './auth/service/checkAuth';
import KeywordProcess from './crawler/model/versionProcess';
dotenv.config()
const app = express()

app.use(json())
app.set('trust proxy',true)

app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV!='coasdwada',

    })
)
app.use(currentUser)
app.use('/',keywordRouter)
app.use('/',authRouter)
app.listen(5000,async ()=>{
    console.log('dc di ne dport 5000')
})
// app.all('*', async (req, res) => {
//     throw new NotFoundError();
// });
  
app.use(errorHandler);
const start = async () => {
    await mongoose.connect(process.env.MONGO_URI!, {
    });
    var versionProcessing = await KeywordProcess.findOne({})
    if(!versionProcessing){
        const insert = KeywordProcess.build({
            keywordProcessed:0,
            keywordVersion:0
        })
        await insert.save()
        versionProcessing = await KeywordProcess.findOne({})
    }
}
interface UserPayload{
    id:string,
    email:string
}
declare global {
    namespace Express {
      interface Request {
        currentUser?: UserPayload;
      }
    }
}
start()


