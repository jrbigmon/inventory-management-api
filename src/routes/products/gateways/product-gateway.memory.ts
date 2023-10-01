import { Product } from '../entities/products.entity';
import { ProductGatewayInterface } from './product-gateway.interface';
import { Filter } from '../../../interfaces/filters.interface';
import { ID_MUST_BE_PROVIDED, PRODUCT_NOT_FOUND } from '../utils/constants';

export class ProductGatewayMemory implements ProductGatewayInterface {
  private products: Product[] = [];

  async create(value?: Product): Promise<Product> {
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

    this.products[productToUpdate] = value;

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
  }

  async findAll(filters: Filter<Product>): Promise<Product[]> {
    if (filters && Object.keys(filters)?.length) {
      return this.products.filter((p) => {
        let isMatch = true;

        for (const key in filters) {
          if (!String(p[key]).includes(filters[key])) isMatch = false;
        }

        return isMatch;
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
