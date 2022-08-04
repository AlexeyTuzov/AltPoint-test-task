import { HttpException, HttpStatus } from '@nestjs/common';

const HttpExceptionServerError = () => {
    throw new HttpException({
        'status': HttpStatus.INTERNAL_SERVER_ERROR,
        'code': 'INTERNAL_SERVER_ERROR'
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}

export default HttpExceptionServerError;
