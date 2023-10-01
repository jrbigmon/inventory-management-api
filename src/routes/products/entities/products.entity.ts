import { differenceInDays } from 'date-fns';

export class Product {
  constructor(
    public name: string,
    public price: number,
    public description?: string,
    public imgURL?: string,
    public expired?: Date,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public id?: string,
  ) {}

  getExpirationDateInDays(): number {
    return differenceInDays(new Date(this.expired), new Date());
  }
}
