import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.)

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemeni-1.5-flash" });

    const prompt = "Write a sonnet about a programmers life, but also make ti rhyme."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();