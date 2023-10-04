import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from './entities/products.entity';
import { ProductGatewayMemory } from './gateways/product-gateway.memory';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let service: ProductService;

  const body: ProductCreateDto = {
    name: 'Chair',
    price: 50.99,
    description: 'office chair',
    expiredAt: new Date('2022-12-01 00:00:00'),
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
      expect(result.updatedAt).not.toBeNull();
    });

    it('should be return a exception error when name is not provided', async () => {
      let result: Product = null;

      try {
        result = await service.create({ ...body, name: null });
      } catch (error) {
        expect(error.message).toBe('name should not be empty');
      } finally {
        expect(result).toBe(null);
      }
    });

    it('should be return a exception error when price is not provided', async () => {
      let result: Product = null;

      try {
        result = await service.create({ ...body, price: null });
      } catch (error) {
        expect(error.message).toBe('price should not be empty');
      } finally {
        expect(result).toBe(null);
      }
    });
  });

  describe('ProductService.findAll', () => {
    it('should be return a list of products', async () => {
      const result = await service.findAll({ expired: true });

      expect(result?.length).toBe(1);
    });

    it('should be return a list of products empty', async () => {
      const result = await service.findAll({ expired: false });

      expect(result?.length).toBe(0);
    });

    it(`should be return a list of products with name ${body.name}`, async () => {
      const result = await service.findAll({ name: 'Chair', expired: true });

      expect(result?.length).toBe(1);
    });

    it('should be return a list of products empty when name is not match', async () => {
      const result = await service.findAll({ name: 'Table', expired: true });

      expect(result?.length).toBe(0);
    });
  });

  describe('ProductService.findById', () => {
    it('should be return a product', async () => {
      const result = await service.findById(lastIdCreated);

      expect(result).not.toBeNull();
    });
  });

  describe('ProductService.update', () => {
    it('should update a product', async () => {
      const newName = 'Table';
      const result = await service.update(lastIdCreated, { name: newName });
      const updatedProduct = await service.findById(lastIdCreated);

      expect(updatedProduct.name).toBe(newName);
      expect(result).toBe(true);
    });
  });
});
