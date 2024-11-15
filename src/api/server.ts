import GeminiAPIService from "@services/gemini-api-service";
import fastify, { FastifyListenOptions } from "fastify";

const app = fastify()
const port = parseInt(process.env.SERVER_PORT) ?? 3000

export default class Server {
    private gemini_api_service = new GeminiAPIService()

    constructor() {
        this.init()
    }

    init (onListen?: () => void) {
        app.listen({
            port
        }).then(() => {
            console.log(`Server listening on port ${port}`)
            onListen()
        })

        app.get('/ai?prompt=:prompt', {
            logLevel: 'warn'
        }, async (request, reply) => {
            const prompt = request.query

            console.log(prompt)

            reply.status(200).send({
                prompt
            })
            
        })
    }
}