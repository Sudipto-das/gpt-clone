import OpenAI from "openai";
import express from 'express'
import cors from "cors"
import * as dotenv from "dotenv";
import e from "express";
dotenv.config()

const openai = new OpenAI({
    organization:'org-LXjM6sjeyn9GflRdLHjffbwm',
    apiKey:process.env.OPENAI_API_KEY,
})

const app = express()
const port = 3000
app.use(cors())
app.use(express.json()); 


app.post('/',async(req,res)=>{

    const {message} = req.body
    console.log(message)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${message}` }],
        model: "gpt-3.5-turbo",
        max_tokens:20
      });
      res.json({
        completion:completion.choices[0].message
      })
})



app.listen(port,()=>{
    console.log(`server running at ${port}`)
})