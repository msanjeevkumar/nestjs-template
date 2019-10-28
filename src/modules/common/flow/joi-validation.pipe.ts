import * as Joi from '@hapi/joi';
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

/* tslint:disable:no-any */

@Injectable()
export abstract class JoiValidationPipe implements PipeTransform<any> {
  public transform(value: any, metadata: ArgumentMetadata) {
    const result = this.buildSchema().validate(value);
    const { error, value: validatedValue } = result;
    if (error) {
      throw new HttpException(
        {
          message: 'Validation failed',
          detail: error.message.replace(/"/g, `'`),
          statusCode: HttpStatus.BAD_REQUEST
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return validatedValue;
  }

  public abstract buildSchema(): Joi.ObjectSchema;
}
