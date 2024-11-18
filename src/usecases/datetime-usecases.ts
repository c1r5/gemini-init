export function provideDatetime(): string {
    return (new Date(Date.now())).toUTCString()
}