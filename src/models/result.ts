export default class Result <R, E> {
    success: R | null = null
    error: E | null = null

    constructor () {}

    setError(error: E) {
        this.error = error
    }

    setResult(success: R) {
        this.success = success
    }

    printStackError() {
        console.error(this.error)
    }

    onSuccess(callback: (success: R) => void) {
        if (this.success) {
            callback(this.success)
        }
    }

    onError(callback: (error: E) => void) {
        if (this.error) {
            callback(this.error)
        }
    }

}