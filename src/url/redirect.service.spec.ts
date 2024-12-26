import { Test, TestingModule } from '@nestjs/testing';
import { RedirectController } from './redirect.controller';
import { UrlsService } from './urls.service';
import { NotFoundException, GoneException } from '@nestjs/common';
import { Url } from './entities/url.entity';

describe('RedirectController', () => {
  let controller: RedirectController;
  let urlsService: UrlsService;
  let dataResponse: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectController],
      providers: [
        {
          provide: UrlsService,
          useValue: {
            create: jest.fn(),
            findByShortCode: jest.fn(),
            updateHitCounter: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RedirectController>(RedirectController);
    urlsService = module.get<UrlsService>(UrlsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const expectedResult = {
    id: 1,
    shortUrl: 'http://localhost:3000/r/abc123',
    originalUrl: 'https://google.com',
    expiresAt: null as any,
  };

  describe('create', () => {
    it('should create a new short URL', async () => {
      const createUrlDto = {
        originalUrl: 'https://google.com',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours
      };
      expectedResult.expiresAt = createUrlDto.expiresAt;

      jest.spyOn(urlsService, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createUrlDto);
      dataResponse = result;

      expect(result).toHaveProperty('shortUrl');
      expect(result).toHaveProperty('originalUrl', expectedResult.originalUrl);
      expect(result).toHaveProperty('expiresAt', expectedResult.expiresAt);
      expect(urlsService.create).toHaveBeenCalledWith(createUrlDto);
    });
  });

  describe('redirect', () => {
    it('should redirect to original URL', async () => {
      const shortCode = dataResponse.shortUrl.split('/').pop();
      console.log(shortCode);
      const url = {
        id: dataResponse.id,
        shortCode: shortCode,
        originalUrl: dataResponse.originalUrl,
        expiresAt: dataResponse.expiresAt,
        isActive: true,
        hits: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Url;

      jest.spyOn(urlsService, 'findByShortCode').mockResolvedValue(url);
      jest.spyOn(urlsService, 'updateHitCounter').mockResolvedValue(undefined);

      const result = await controller.redirect(dataResponse.shortUrl);

      expect(result).toEqual({ url: url.originalUrl });
      expect(urlsService.findByShortCode).toHaveBeenCalledWith(
        expectedResult.shortUrl,
      );
      expect(urlsService.updateHitCounter).toHaveBeenCalledWith(url.id);
    });

    it('should throw NotFoundException when URL not found', async () => {
      const shortUrl = 'nonexistent';

      jest.spyOn(urlsService, 'findByShortCode').mockResolvedValue(null);

      await expect(controller.redirect(shortUrl)).rejects.toThrow(
        NotFoundException,
      );
      expect(urlsService.findByShortCode).toHaveBeenCalledWith(shortUrl);
      expect(urlsService.updateHitCounter).not.toHaveBeenCalled();
    });

    it('should throw GoneException when URL has expired', async () => {
      const shortUrl = 'expired';
      const url = {
        id: 1,
        shortCode: shortUrl,
        originalUrl: 'https://google.com',
        expiresAt: new Date(Date.now() - 86400000), // yesterday
        isActive: true,
        hits: 0,
      } as Url;

      jest.spyOn(urlsService, 'findByShortCode').mockResolvedValue(url);

      await expect(controller.redirect(shortUrl)).rejects.toThrow(
        GoneException,
      );
      expect(urlsService.findByShortCode).toHaveBeenCalledWith(shortUrl);
      expect(urlsService.updateHitCounter).not.toHaveBeenCalled();
    });

    it('should throw GoneException when URL is inactive', async () => {
      const shortUrl = 'inactive';
      const url = {
        id: 1,
        shortCode: shortUrl,
        originalUrl: 'https://google.com',
        expiresAt: null as any,
        isActive: false,
        hits: 0,
      } as Url;

      jest.spyOn(urlsService, 'findByShortCode').mockResolvedValue(url);

      await expect(controller.redirect(shortUrl)).rejects.toThrow(
        GoneException,
      );
      expect(urlsService.findByShortCode).toHaveBeenCalledWith(shortUrl);
      expect(urlsService.updateHitCounter).not.toHaveBeenCalled();
    });

    it('should throw GoneException when URL is soft deleted', async () => {
      const shortUrl = 'deleted';
      const url = {
        id: 1,
        shortCode: shortUrl,
        originalUrl: 'https://google.com',
        expiresAt: null as any,
        isActive: true,
        hits: 0,
        deletedAt: new Date(Date.now() - 86400000), // yesterday
      } as Url;

      jest.spyOn(urlsService, 'findByShortCode').mockResolvedValue(url);

      await expect(controller.redirect(shortUrl)).rejects.toThrow(
        GoneException,
      );
      expect(urlsService.findByShortCode).toHaveBeenCalledWith(shortUrl);
      expect(urlsService.updateHitCounter).not.toHaveBeenCalled();
    });
  });
});
