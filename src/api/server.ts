import fastify, { FastifySchema } from "fastify";

type Route = {
    method: string
    path: string
    handler: any
    schema?: FastifySchema
}

const defaultRoute = {
    method: "GET",
    path: "/",
    handler: async (req: any, res: any) => {
        res.status(200).send({
            message: "Hello World"
        })
    }
}

export default class Server {
    private port = 3000
    private app = fastify()
    
    private routes: Route[] = [defaultRoute]
    
    addRoute(route: Route): this {
        this.routes.push(route)

        return this
    }

    init() {
        for (const route of this.routes) {
            console.log(`Adding route ${route.method} ${route.path}`)
            this.app.route({
                method: route.method,
                url: route.path,
                handler: route.handler,
                schema: route.schema
            })
        }
        this.app.listen({port: this.port}).then(() => console.log(`Server running on port ${this.port}`))
    }
}

