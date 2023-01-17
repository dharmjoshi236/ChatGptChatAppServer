import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

const configuration = new Configuration({
    apiKey: process.env.CHAT_API_KEY
});
const openai = new OpenAIApi(configuration);

app.get('/', (req,res)=> {
    res.send("Welcome To The ChatGptServer Implementation For ChatBot using OpenAiApis")
})

app.post('/chat', async(req,res)=> {
    if (!req.body.prompt) {
        res.status(400).json({
            message: "Human Prompt Is Necessary"
        })
    }
    

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.prompt,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
          });
          if (response.status === 200) {
            console.log('response', response.data);
            res.status(200).json({
                data: response.data.choices[0].text
            })
          }

    }catch(e){
        res.status(400).json({
            message:"Something went wrong , Please try again......."
        })
    }

})

app.listen(PORT, ()=> {
    console.log("Server listening on port 5000")
})
