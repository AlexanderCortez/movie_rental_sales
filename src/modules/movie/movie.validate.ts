import {
  validateSync,
} from 'class-validator';
import { BodyValidation } from '@movie-module/dto/body-validation.dto';
import { MessageCodeError } from '@config/errors/';
import { IBody } from '@movie-module/interfaces';


type TValidation = {
  valid: boolean,
  error: MessageCodeError | null
}

export class ValidateRequest {
  private body: IBody;

  constructor(body: IBody) {
    this.body = body;
  }

  validateBody(): TValidation {
    const validation: TValidation = {
      valid: true,
      error: null,
    }
    const bodyValidation = new BodyValidation(this.body);
    const [validator] = validateSync(bodyValidation);
    if (validator) {
      const newError = {
        properType: validator.property,
        messages: validator.constraints
      }
      validation.valid = false;
      validation.error = new MessageCodeError('badRequest', newError);
    }
    return validation;
  }

  validate(): TValidation {
    return this.validateBody();
  }
}