import { differenceInDays } from 'date-fns';

export class Product {
  constructor(
    private _name: string,
    private _price: number,
    private _description?: string,
    private _imgURL?: string,
    private _expired?: Date,
    private _createdAt?: Date,
    private _updatedAt?: Date,
    private _deletedAt?: Date,
    private _id?: string,
  ) {}

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
    this._updatedAt = new Date();
  }

  get name(): string {
    return this._name;
  }

  set price(value: number) {
    this._price = value;
    this._updatedAt = new Date();
  }

  get price(): number {
    return this._price;
  }

  set description(value: string) {
    this._description = value;
    this._updatedAt = new Date();
  }

  get description(): string {
    return this._description;
  }

  set imgURL(value: string) {
    this._imgURL = value;
    this._updatedAt = new Date();
  }

  get imgURL(): string {
    return this._imgURL;
  }

  set deletedAt(value: Date) {
    this._deletedAt = value;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updateAt(): Date {
    return this._updatedAt;
  }

  set updateAt(value: Date) {
    this._updatedAt = value;
  }

  get expired(): Date {
    return this._expired;
  }

  set expired(value: Date) {
    this._expired = value;
  }

  getExpirationDateInDays(): number {
    return differenceInDays(new Date(this.expired), new Date());
  }
}
