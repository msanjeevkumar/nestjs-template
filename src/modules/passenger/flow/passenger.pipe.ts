import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from '../../common';
import { Passenger } from '../model';

export class PassengerPipe extends JoiValidationPipe {
  public buildSchema(): Joi.ObjectSchema {
    return Joi.object({
      firstName: Joi.string()
        .required()
        .max(Passenger.NAME_LENGTH),
      lastName: Joi.string()
        .required()
        .max(Passenger.NAME_LENGTH)
    });
  }
}
