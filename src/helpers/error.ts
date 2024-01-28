export class ConflictRequestError {
  status = 409;
  message;

  constructor(message: string) {
    this.message = message;
  }
}

export class NotFoundRequestError {
  status = 404;
  message;

  constructor(message: string) {
    this.message = message;
  }
}
