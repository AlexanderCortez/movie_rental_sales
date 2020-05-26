import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  index(): any {
    return {
      ok2: true
    }
  } 
}