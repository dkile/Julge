export class ConflictRequestError {
  status = 409;
  message;

  constructor(message: string) {
    this.message = message;
  }
}
