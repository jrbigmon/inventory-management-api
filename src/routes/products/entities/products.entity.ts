import { differenceInDays } from 'date-fns';

export class Product {
  constructor(
    public name: string,
    public price: number,
    public description?: string,
    public imgURL?: string,
    public expiredAt?: Date,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date,
    public id?: string,
  ) {}

  public getExpirationDateInDays(): number {
    return differenceInDays(new Date(this.expiredAt), new Date());
  }

  public isExpired(): boolean {
    return this.getExpirationDateInDays() <= 0;
  }
}
