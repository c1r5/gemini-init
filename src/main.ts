import AIRoute from "./api/routes";
import Server from "./api/server";


(new Server()).addRoute({
    method: "GET",
    path: "/ai/:prompt",
    handler: AIRoute.handler
}).init()