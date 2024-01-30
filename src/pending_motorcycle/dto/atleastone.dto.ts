// at-least-one.validator.ts

import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'atLeastOne', async: false })
export class AtLeastOneConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { object } = args;
    const fields = ['RFC', 'CURP', 'INE'];

    const filledFields = fields.filter(field => object[field]);

    return filledFields.length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return 'At least one of RFC, CURP, or INE should be provided';
  }
}

export function AtLeastOne(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneConstraint,
    });
  };
}
