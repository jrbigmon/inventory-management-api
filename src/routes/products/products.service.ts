import { Injectable } from '@nestjs/common';
import { ProductGatewayInterface } from './gateways/product-gateway.interface';
import { Product } from './entities/products.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { Filter } from '../../interfaces/filters.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productGateway: ProductGatewayInterface) {}

  public async create(product: ProductCreateDto): Promise<Product> {
    const productToCreate = new Product(
      product?.name,
      product?.price,
      product?.description,
      product?.imgURL,
      product?.expired,
    );

    if (!productToCreate?.name) {
      throw new Error('Name must be provided');
    }

    if (!productToCreate?.price) {
      throw new Error('Price must be provided');
    }

    return await this.productGateway.create(productToCreate);
  }

  public async findAll(
    filters?: Filter<Product>,
    expired?: boolean,
  ): Promise<Product[]> {
    const resultsInDb = await this.productGateway.findAll(filters);

    const products = resultsInDb?.map(
      (r) =>
        new Product(
          r.name,
          r.price,
          r.description,
          r.imgURL,
          r.expired,
          r.createdAt,
          r.updateAt,
          r.deletedAt,
          r.id,
        ),
    );

    if (!expired) {
      return products.filter(
        (product) => product.getExpirationDateInDays() > 0,
      );
    }

    return products;
  }

  public async findById(id: string): Promise<Product> {
    return await this.productGateway.findById(id);
  }
}
