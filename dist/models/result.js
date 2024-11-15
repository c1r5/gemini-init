export default class Result {
    success = null;
    error = null;
    constructor() { }
    setError(error) {
        this.error = error;
    }
    setResult(success) {
        this.success = success;
    }
    printStackError() {
        console.error(this.error);
    }
    onResult(callback) {
        if (this.success) {
            callback(this.success, this.error);
        }
        else if (this.error) {
            callback(this.success, this.error);
        }
    }
}
