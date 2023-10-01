import { validateOrReject } from 'class-validator';

export class ValidationServices {
  constructor(private dto: any) {}

  async validate<T>(value: T) {
    const dtoToValidate = new this.dto();

    const valueValidated = Object.assign(dtoToValidate, value);

    console.log(valueValidated);

    try {
      await validateOrReject(valueValidated);
    } catch (errors) {
      return errors[0]?.constraints[Object.keys(errors[0]?.constraints)?.[0]];
    }
  }
}
