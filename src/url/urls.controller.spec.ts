import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('UrlsController', () => {
  let controller: UrlsController;
  let service: UrlsService;

  const mockUrlsService = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [
        {
          provide: UrlsService,
          useValue: mockUrlsService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    controller = module.get<UrlsController>(UrlsController);
    service = module.get<UrlsService>(UrlsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new URL', async () => {
      const createUrlDto: CreateUrlDto = {
        originalUrl: 'https://example.com',
      };
      const expectedResult = { id: 1, ...createUrlDto };

      mockUrlsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createUrlDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createUrlDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated URLs', async () => {
      const expectedResult = {
        data: [{ id: 1, originalUrl: 'https://example.com' }],
        meta: { page: 1, limit: 10, total: 1 },
      };

      mockUrlsService.findManyWithPagination.mockResolvedValue(expectedResult);

      const result = await controller.findAll(1, 10, 'abc', 'example');

      expect(result).toEqual(expectedResult);
      expect(service.findManyWithPagination).toHaveBeenCalledWith(
        { shortCode: 'abc', keyword: 'example' },
        { page: 1, limit: 10 },
      );
    });

    it('should limit to 50 items per page', async () => {
      await controller.findAll(1, 100, 'abc', 'example');

      expect(service.findManyWithPagination).toHaveBeenCalledWith(
        { shortCode: 'abc', keyword: 'example' },
        { page: 1, limit: 50 },
      );
    });
  });

  describe('findOne', () => {
    it('should return a single URL', async () => {
      const expectedResult = { id: 1, originalUrl: 'https://example.com' };

      mockUrlsService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update a URL', async () => {
      const updateUrlDto: UpdateUrlDto = {
        originalUrl: 'https://updated-example.com',
      };
      const expectedResult = { id: 1, ...updateUrlDto };

      mockUrlsService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(1, updateUrlDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateUrlDto);
    });
  });

  describe('remove', () => {
    it('should remove a URL', async () => {
      await controller.remove(1);

      expect(service.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
