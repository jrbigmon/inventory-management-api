import { validateOrReject } from 'class-validator';

type ConstructorClass<T> = new (...args: any) => T;

export class ValidationServices<T> {
  constructor(protected readonly dto: ConstructorClass<T>) {}

  async validate(value: T) {
    const dtoToValidate = new this.dto();

    const valueValidated = Object.assign(dtoToValidate, { ...value });

    try {
      await validateOrReject(valueValidated as unknown as object);
    } catch (errors) {
      return errors[0]?.constraints[Object.keys(errors[0]?.constraints)?.[0]];
    }
  }
}
