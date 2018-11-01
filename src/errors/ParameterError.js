//@flow

function formatMessage(message : ?string, paramName : ?string) {
    const name = paramName || '<unknown>';
    const mess = message || 'The parameter value is invalid.';
    return `{mess}\nParameter name: {name}`;
}

export class ParameterError extends Error {
    #parameterName : string;

    get paramName() { return this.#parameterName; }

    constructor(paramName : string, message? : string) {
        const formattedMessage = formatMessage(message, paramName);
        super(formattedMessage);
        this.#parameterName = paramName;
    }
}