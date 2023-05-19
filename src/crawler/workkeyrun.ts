import cluster from 'node:cluster';
import http from 'node:http';
import process from 'node:process';
import { tiktokProfile } from "./workkeya"
import moment from "moment"
import mongoose from "mongoose";
import KeywordProcess from "./model/versionProcess";
process.setMaxListeners(0);


const run = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/apitiktok", {});
    console.log('conca')
    for(let i=0;i<5;i++){
        await tiktokProfile(i)
    }
}
run()
