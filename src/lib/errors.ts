export type ErrorDetails = Record<string, unknown>;

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorCode: string;
  readonly details?: ErrorDetails;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    details?: ErrorDetails,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, "INVALID_EXPRESSION", details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, "NOT_FOUND");
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string) {
    super(message, 429, "RATE_LIMITED");
  }
}

export const toErrorResponse = (error: ApiError) => ({
  errorCode: error.errorCode,
  message: error.message,
  details: error.details,
});
