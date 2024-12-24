import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
@ValidatorConstraint({ name: 'IsISOTime', async: false })
export class IsISOTime implements ValidatorConstraintInterface {
  constructor() {}
  validate(value: string) {
    return moment(value, moment.ISO_8601, true).isValid();
  }

  defaultMessage() {
    return 'Value must be in the format YYYY-MM-DDTHH:mm:ss.SSSZ';
  }
}
