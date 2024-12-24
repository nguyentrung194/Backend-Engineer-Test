import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

function transformErrors(errors: ValidationError[]) {
  return errors.reduce((accumulator, currentValue) => {
    const propertyErrors = currentValue.children
      ? transformErrors(currentValue.children)
      : {};
    const constraintMessages = Object.values(
      currentValue.constraints ?? {},
    ).join(', ');

    return {
      ...accumulator,
      [currentValue.property]: {
        ...(propertyErrors && { ...propertyErrors }),
        message: constraintMessages,
      },
    };
  }, {});
}

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: transformErrors(errors),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
};

export default validationOptions;
