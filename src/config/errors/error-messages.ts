import { HttpStatus } from '@nestjs/common';
import { IErrorMessage } from './interfaces/errors.interface';

export const getMessageError = (errorCode: string, error: object | string): IErrorMessage => {
  const errorMessages: { [messageCode: string]: IErrorMessage } = {
    badRequest: {
      type: 'BadRequest',
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      error: {},
    },
    notFound: {
      type: 'Not Found',
      httpStatus: HttpStatus.NOT_FOUND,
      error: {},
    },
  }
  let newErrorMessage: IErrorMessage | undefined;
  Object
    .keys(errorMessages)
    .some((key) => {
      if (key === errorCode) {
        newErrorMessage = errorMessages[key];
        newErrorMessage.error = error;
        return true;
      }
      return false;
    });
  if (!newErrorMessage) {
    throw new Error('Unable to find given errorCode');
  }
  return newErrorMessage;
}

