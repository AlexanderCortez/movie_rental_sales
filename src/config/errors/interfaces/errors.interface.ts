import { HttpStatus } from '@nestjs/common';

export interface IErrorMessage {
  type: string,
  httpStatus: HttpStatus,
  error: object | string,
  userMessage?: object | string
}