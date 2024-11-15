import Service from "../models/service";
import Result from "../models/result";
export default class GeminiAPIService implements Service<String, Error> {
    run(prompt: string): Promise<Result<String, Error>>;
}
