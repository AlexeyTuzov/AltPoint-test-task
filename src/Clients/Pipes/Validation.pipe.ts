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
                        const nestedConstraints = nestedErr.constraints ?
                            nestedErr.constraints : nestedErr.children[0].constraints;
                        const nestedProperty = nestedErr.children[0]?.property ?
                            nestedErr.children[0].property : '';
                        messages.push(
                            {
                                field: `${err.property}.${nestedErr.property}.${nestedProperty}`,
                                rule: Object.keys(nestedConstraints)[0],
                                message: Object.values(nestedConstraints)[0]
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
