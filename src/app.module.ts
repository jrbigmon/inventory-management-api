import { Module } from '@nestjs/common';
import { ProductModule } from './routes/products/products.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
