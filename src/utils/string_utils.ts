export function replace_special_characters (str: string): string {
    return str.replace(/\W/g, "")
}
