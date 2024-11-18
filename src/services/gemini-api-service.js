import { GoogleGenerativeAI } from "@google/generative-ai"
import { gemini_api_key } from "../constants"

import Result from "../models/result"

const genAI = new GoogleGenerativeAI(gemini_api_key??"")
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
})

export default class GeminiAPIService {
    async run(prompt){
        const resultInstance = new Result()
        const result = await model.generateContent(prompt)
        
        resultInstance.setResult(result.response.text())

        return resultInstance
    
    }
    
}