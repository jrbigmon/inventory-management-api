import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './entities/products.entity';
import { ProductCreateDto } from './dto/product-create.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  async create(@Body() body: ProductCreateDto): Promise<Product> {
    try {
      return await this.service.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
