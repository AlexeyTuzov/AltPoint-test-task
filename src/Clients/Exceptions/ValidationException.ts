import { HttpException, HttpStatus } from '@nestjs/common';

export default class ValidationException extends HttpException {
    private messages;
    constructor(response) {
        super(response, HttpStatus.UNPROCESSABLE_ENTITY);
        this.messages = response;
    }
}
