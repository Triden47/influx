// Define a custom error class extending Error
export class HttpError extends Error {
  status: number;
  statusText: string;
  data: any;
  url: string;

  constructor(message: string, status: number, statusText: string, data: any, url: string) {
    super(message);  // Call the parent constructor (Error)
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.url = url;

    // Set the prototype explicitly (only necessary when targeting ES5 or below)
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}