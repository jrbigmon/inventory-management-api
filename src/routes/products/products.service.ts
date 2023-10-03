import { Injectable } from '@nestjs/common';
import { ProductGatewayInterface } from './gateways/product-gateway.interface';
import { Product } from './entities/products.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { Filter } from '../../interfaces/filters.interface';
import { ValidationServices } from '../../validations/validations-services';

export interface ProductFilter extends Product {
  expired: boolean;
}

@Injectable()
export class ProductService {
  constructor(private readonly productGateway: ProductGatewayInterface) {}

  private validationService: ValidationServices;

  public async create(product: ProductCreateDto): Promise<Product> {
    this.validationService = new ValidationServices(ProductCreateDto);

    const productToCreate = new Product(
      product?.name,
      product?.price,
      product?.description,
      product?.imgURL,
      product?.expiredAt,
    );

    const error = await this.validationService.validate(productToCreate);

    if (error) {
      throw new Error(error);
    }

    return await this.productGateway.create(productToCreate);
  }

  public async findAll(filters?: Filter<ProductFilter>): Promise<Product[]> {
    const resultsInDb = await this.productGateway.findAll(filters);

    const products = resultsInDb?.map(
      (r) =>
        new Product(
          r.name,
          r.price,
          r.description,
          r.imgURL,
          r.expiredAt,
          r.createdAt,
          r.updatedAt,
          r.deletedAt,
          r.id,
        ),
    );

    if (!filters?.expired)
      return products.filter((product) => !product.isExpired());

    return products;
  }

  public async findById(id: string): Promise<Product> {
    return await this.productGateway.findById(id);
  }
}
