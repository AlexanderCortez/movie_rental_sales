import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ValidateRequest } from '@movie-module/movie.validate'

@Injectable()
export class MovieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    const validation = new ValidateRequest(body)
      .validate();

    if (validation.valid) {
      return next.handle();
    }
    const { error } = validation
    return throwError(new HttpException(error, error.httpStatus));
  }
}