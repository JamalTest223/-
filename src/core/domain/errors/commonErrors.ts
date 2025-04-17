export class BaseError extends Error {
  public readonly statusCode: number;
  constructor(
    name: string,
    message: string,
    statusCode: number = 500,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.statusCode = statusCode;
    this.name = name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = "Not Found") {
    super("Not Found", message, 404);
  }
}

export class InputParseError extends BaseError {
  constructor(message: string = "Input Parse Error", options?: ErrorOptions) {
    super("Input Parse Error", message, 400, options);
  }
}
