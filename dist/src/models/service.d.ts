import Result from "./result";
export default interface Service<R, E> {
    run(params: any): Promise<Result<R, E>>;
}
