import { GoogleGenerativeAI } from "@google/generative-ai"
import { gemini_api_key } from "@constants"

import Service from "@models/service"
import Result from "@models/result"

const genAI = new GoogleGenerativeAI(gemini_api_key??"")
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
})

export default class GeminiAPIService implements Service<String, Error> {
    async run(prompt: string): Promise<Result<String, Error>> {
        const resultInstance = new Result<String, Error>()
        const result = await model.generateContent(prompt)
        
        resultInstance.setResult(result.response.text())

        return resultInstance
    
    }
    
}