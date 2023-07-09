import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthGameUpdate extends Error {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
      }
    
      statusCode: number;
}
