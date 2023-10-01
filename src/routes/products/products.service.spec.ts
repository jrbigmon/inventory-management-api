import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from './entities/products.entity';
import { ProductGatewayMemory } from './gateways/product-gateway.memory';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let service: ProductService;

  const body: ProductCreateDto = {
    name: 'Cadeira',
    price: 50.99,
    description: 'Cadeira de escritório branca.',
    expired: new Date('2022-12-01 00:00:00'),
  };

  let lastIdCreated: string;

  beforeAll(() => {
    service = new ProductService(new ProductGatewayMemory());
  });

  describe('ProductService.create', () => {
    it('should be created a new product', async () => {
      const result = await service.create(body);

      lastIdCreated = result?.id;

      expect(result).toMatchObject(body);
      expect(result.id).not.toBeNull();
      expect(result.createdAt).not.toBeNull();
      expect(result.updateAt).not.toBeNull();
    });

    it('should be return a exception error when name is not provided', async () => {
      let result: Product = null;

      try {
        result = await service.create({ ...body, name: null });
      } catch (error) {
        expect(error.message).toBe('Name must be provided');
      } finally {
        expect(result).toBeNull();
      }
    });

    it('should be return a exception error when price is not provided', async () => {
      let result: Product = null;

      try {
        result = await service.create({ ...body, price: null });
      } catch (error) {
        expect(error.message).toBe('Price must be provided');
      } finally {
        expect(result).toBeNull();
      }
    });
  });

  describe('ProductService.findAll', () => {
    it('should be return a list of products', async () => {
      const result = await service.findAll(undefined, true);

      expect(result?.length).toBe(1);
    });

    it('should be return a list of products empty', async () => {
      const result = await service.findAll(undefined, false);

      expect(result?.length).toBe(0);
    });
  });

  describe('ProductService.findById', () => {
    it('should be return a product', async () => {
      const result = await service.findById(lastIdCreated);

      expect(result).not.toBeNull();
    });
  });
});
