
import  Queue  from 'bull'
import Keyword from '../controller/schema/keyword'
import KeywordStore from '../controller/schema/keywordStore'
const queueKeyWordApi = new Queue('queueKeyWordApiDeloy','redis://127.0.0.1:6379')
import User from '../auth/model/user'

import mongoose from 'mongoose'
const addQueue = async  ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/apitiktok", {});

    try {

    const data =  await Keyword.find({addQueue:false}).select("-addQueue").limit(30)
    data.map(async(x:any)=>{
       
        const{_id,idKeywordStore,keyword,version} = x

        queueKeyWordApi.add({idKeywordStore,keyword,version,"addQueued":0})
        await Keyword.updateOne({_id},{addQueue:true})
    })  
    console.log(await queueKeyWordApi.count())
    } catch (error) {
        console.log(error)
    }

 
}


addQueue()
