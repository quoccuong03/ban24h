
export function isEmpty(str: string | [any] | any[]): boolean {
    return str == null || str.length === 0
}

export function sendError(error: any) {
    console.warn("============ ERROR ===========", error);
    if (error) {
        // console.log(error)
        if (error.stack) {
            console.warn(error.stack)
        }
    }
}
