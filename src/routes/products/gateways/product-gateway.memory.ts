import { Product } from '../entities/products.entity';
import { ProductGatewayInterface } from './product-gateway.interface';
import { Filter } from '../../../interfaces/filters.interface';
import { ID_MUST_BE_PROVIDED, PRODUCT_NOT_FOUND } from '../utils/constants';
import { randomUUID } from 'crypto';

export class ProductGatewayMemory implements ProductGatewayInterface {
  private products: Product[] = [];

  async create(value: Product): Promise<Product> {
    const instantDate = new Date();

    value.id = randomUUID();
    value.createdAt = instantDate;
    value.updatedAt = instantDate;

    this.products.push(value);

    return value;
  }

  async update(id: string, value: Product) {
    if (!id) {
      throw new Error(ID_MUST_BE_PROVIDED);
    }

    const productToUpdate = this.products.findIndex((p) => p.id === id);

    if (productToUpdate === -1) {
      throw new Error(PRODUCT_NOT_FOUND);
    }

    for (const key in value) {
      if (value[key]) {
        this.products[productToUpdate][key] = value[key];
      }
    }

    return true;
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error(ID_MUST_BE_PROVIDED);
    }

    const productToDelete = this.products.findIndex((p) => p.id === id);

    if (productToDelete === -1) {
      throw new Error(PRODUCT_NOT_FOUND);
    }

    this.products.splice(productToDelete, 1);
  }

  async getTotalPriceInStock(): Promise<number> {
    if (this.products?.length) {
      return this.products
        .map((p) => p.price)
        .reduce((total, p = 0) => total + p);
    }

    return 0;
  }

  async findAll(filters?: Filter<Product>): Promise<Product[]> {
    if (filters && Object.keys(filters)?.length) {
      return this.products.filter((p) => {
        for (const key in filters) {
          if (p[key]) {
            const valueInMemory = String(p[key])?.toLowerCase();
            const valueInFilter = String(filters[key])?.toLowerCase();

            if (!valueInMemory?.includes(valueInFilter)) {
              return false;
            }
          }
        }

        return true;
      });
    }

    return this.products;
  }

  async findById(id: string): Promise<Product> {
    if (!id) {
      throw new Error(ID_MUST_BE_PROVIDED);
    }

    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new Error(PRODUCT_NOT_FOUND);
    }

    return product;
  }
}
