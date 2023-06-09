import cluster from 'node:cluster';
import http from 'node:http';
import process from 'node:process';
import { tiktokProfile } from "./workkeya"
import moment from "moment"
import mongoose from "mongoose";
import KeywordProcess from "./model/versionProcess";
process.setMaxListeners(0);
let a = 0
const run = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/apitiktok", {});
    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);
        // Fork workers.
        for (let i = 0; i <2 ; i++) {
          var env = {
            workerId: i // This is undefined.
           };
          cluster.fork(env);
        }
        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
        });
      } else {
   
        const workerId = parseInt(process.env.workerId!)
        // Workers can share any TCP connection
        // In this case it is an HTTP server
        for(let i=0;i<5;i++){
            await tiktokProfile(i+(workerId*5))
            console.log(`Worker ${i+(workerId*5)} started`);
        }
       
    }
   
}
run()
