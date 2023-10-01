import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

Module({
  imports: [],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [],
});
export class ProductModule {}
