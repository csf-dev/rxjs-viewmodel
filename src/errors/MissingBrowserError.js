//@flow

export class MissingBrowserError extends Error {
    constructor(message : string) {
        super(message);
    }
}