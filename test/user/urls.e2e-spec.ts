import { APP_URL } from '../utils/constants';
import request from 'supertest';

describe('URLs API (e2e)', () => {
  const app = APP_URL;
  let createdUrl: any;

  const validUrl = {
    originalUrl: 'https://google.com',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours
  };

  // URL Creation
  it('should create a shortened URL', async () => {
    return request(app)
      .post('/api/r')
      .send(validUrl)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty('shortUrl');
        expect(body).toHaveProperty('originalUrl', validUrl.originalUrl);
        expect(body).toHaveProperty('expiresAt');
        createdUrl = body;
      });
  });

  it('should reject invalid URLs', async () => {
    return request(app)
      .post('/api/r')
      .send({ originalUrl: 'not-a-valid-url' })
      .expect(422);
  });

  it('should reject blacklisted URLs', async () => {
    return request(app)
      .post('/api/r')
      .send({ originalUrl: 'https://malicious-site.example.com' })
      .expect(400);
  });

  // URL Redirection
  it('should redirect to original URL', async () => {
    const shortUrl = createdUrl.shortUrl;
    return request(shortUrl)
      .get('/')
      .expect(302)
      .then(({ headers }) => {
        expect(headers.location).toBe(validUrl.originalUrl);
      });
  });

  it('should return 404 for non-existent short URLs', async () => {
    return request(app).get('/r/nonexistent').expect(404);
  });

  // Expiration
  it('should return 410 for expired URLs', async () => {
    // Create URL that expires immediately
    const expiredUrl = await request(app)
      .post('/api/r')
      .send({
        originalUrl: 'https://google.com',
        expiresAt: new Date(Date.now() - 1000), // Expired
      })
      .expect(201);

    const shortUrl = expiredUrl.body.shortUrl;
    return request(shortUrl).get('/').expect(410);
  });

  // Optional expiration
  it('should create URL without expiration', async () => {
    return request(app)
      .post('/api/r')
      .send({ originalUrl: 'https://google.com' })
      .expect(201)
      .then(({ body }) => {
        expect(body.expiresAt).toBeNull();
      });
  });
});
