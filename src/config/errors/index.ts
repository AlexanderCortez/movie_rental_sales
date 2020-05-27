import { getMessageError } from './error-messages';

export class MessageCodeError {
  public messageCode: string;
  public httpStatus: number;
  public error: object | string;

  constructor(messageCode: string, error: object | string) {
    const errorMessageConfig = getMessageError(messageCode, error);
    this.httpStatus = errorMessageConfig.httpStatus;
    this.messageCode = messageCode;
    this.error = errorMessageConfig.error;
  }
}