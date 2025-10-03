export function typeOf(value : any) : string {
    if (typeof NodeList != 'undefined') {
        if (Array.isArray(value) || value instanceof NodeList || value instanceof Array) {
            return "array";
        }
    } else {
        if (Array.isArray(value) || value instanceof Array) {
            return "array";
        }
    }
    return typeof value;
}