import { Product } from '../entities/products.entity';
import { GatewayInterface } from '../../../interfaces/gateway.interface';

export interface ProductGatewayInterface extends GatewayInterface<Product> {
  getTotalPriceInStock(): Promise<number>;
}
