import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ValidationException from '../Exceptions/ValidationException';

@Injectable()
export default class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj, { skipMissingProperties: true });

        if (errors.length) {
            const messages = [];
            errors.forEach(err => {
                if (err.children.length) {
                    err.children.forEach(nestedErr => {
                        messages.push(
                            {
                                field: `${err.property}.${nestedErr.property}.${nestedErr.children[0].property}`,
                                rule: Object.keys(nestedErr.children[0].constraints)[0],
                                message: Object.values(nestedErr.children[0].constraints)[0]
                            }
                        );
                    });
                } else {
                    messages.push(
                        {
                            field: err.property,
                            rule: Object.keys(err.constraints)[0],
                            message: Object.values(err.constraints)[0]
                        }
                    );
                }
            });
            throw new ValidationException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    code: 'VALIDATION_ERROR',
                    exceptions: messages
                });
        }
        return value;

    }
}
