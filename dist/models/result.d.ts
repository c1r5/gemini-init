export default class Result<R, E> {
    success: R | null;
    error: E | null;
    constructor();
    setError(error: E): void;
    setResult(success: R): void;
    printStackError(): void;
    onResult(callback: (result: R, error: E) => void): void;
}
