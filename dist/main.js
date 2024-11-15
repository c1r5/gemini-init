import GeminiAPIService from "./services/gemini-api-service";
const gemini_service = new GeminiAPIService();
const result = await gemini_service.run("Olá!");
console.log(result);
