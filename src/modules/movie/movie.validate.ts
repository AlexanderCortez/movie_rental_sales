import {
  validateSync,
} from 'class-validator';
import { MovieDTO } from '@movie-module/dto/movie.dto';
import { MessageCodeError } from '@config/errors/';


type TValidation = {
  valid: boolean,
  error: MessageCodeError | null
}

export class ValidateRequest {
  private body: MovieDTO;

  constructor(body: MovieDTO) {
    this.body = body;
  }

  validateBody(): TValidation {
    const validation: TValidation = {
      valid: true,
      error: null,
    }
    const bodyValidation = new MovieDTO(this.body);
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