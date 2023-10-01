export class Product {
  constructor(
    private _name: string,
    private _price: number,
    private _description?: string,
    private _imgURL?: string,
    private _createdAt?: Date,
    private _updatedAt?: Date,
    private _deletedAt?: Date,
    private _id?: string,
  ) {}

  get id(): string {
    return this._id;
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

  get updateAt(): Date {
    return this._updatedAt;
  }
}
