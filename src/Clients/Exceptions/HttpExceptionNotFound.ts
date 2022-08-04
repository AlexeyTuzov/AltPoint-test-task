import { HttpException, HttpStatus } from '@nestjs/common';

const HttpExceptionNotFound = () => {
    return new HttpException({
        'status': HttpStatus.NOT_FOUND,
        'code': 'ENTITY_NOT_FOUND'
    }, HttpStatus.NOT_FOUND).getResponse();
}

export default HttpExceptionNotFound;
