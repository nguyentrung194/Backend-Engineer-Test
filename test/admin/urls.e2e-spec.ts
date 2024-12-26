import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';
import request from 'supertest';

const sleep = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

describe('URLs Admin API (e2e)', () => {
  const app = APP_URL;
  let apiToken: string;
  let createdUrl: any;

  const testUrl = {
    originalUrl: 'https://facebook.com',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours
  };

  beforeAll(async () => {
    // Get admin token
    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.accessToken;
      });

    // Create a test URL
    await request(app)
      .post('/api/r')
      .send(testUrl)
      .then(({ body }) => {
        createdUrl = body;
      });
  });

  // Admin Listing and Filtering
  it('should list all URLs with details', async () => {
    return request(app)
      .get('/api/v1/urls')
      .auth(apiToken, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.results)).toBeTruthy();
        const url = body.results[0];
        expect(url).toHaveProperty('shortCode');
        expect(url).toHaveProperty('originalUrl');
        expect(url).toHaveProperty('expiresAt');
        expect(url).toHaveProperty('hits');
      });
  });

  it('should filter URLs by shortCode', async () => {
    const shortCode = createdUrl.shortUrl.split('/').pop();
    return request(app)
      .get('/api/v1/urls')
      .auth(apiToken, { type: 'bearer' })
      .query({ shortCode })
      .expect(200)
      .then(({ body }) => {
        expect(body.results.length).toBeGreaterThan(0);
        expect(body.results[0].shortCode).toBe(shortCode);
      });
  });

  it('should filter URLs by keyword in original URL', async () => {
    return request(app)
      .get('/api/v1/urls')
      .auth(apiToken, { type: 'bearer' })
      .query({ keyword: 'facebook.com' })
      .expect(200)
      .then(({ body }) => {
        expect(body.results.length).toBeGreaterThan(0);
        expect(body.results[0].originalUrl).toContain('facebook.com');
      });
  });

  // URL Management
  it('should track hit count', async () => {
    const shortUrl = createdUrl.shortUrl;

    // Visit the URL
    await request(shortUrl).get(`/`);
    await request(shortUrl).get(`/`);
    await sleep(1000);

    // Check hit count
    return request(app)
      .get(`/api/v1/urls/${createdUrl.id}`)
      .auth(apiToken, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(body.hits).toBe(2);
      });
  });

  it('should delete URL and return 410 afterwards', async () => {
    // Delete URL
    await request(app)
      .delete(`/api/v1/urls/${createdUrl.id}`)
      .auth(apiToken, { type: 'bearer' })
      .expect(204);

    await sleep(1000);

    // Try to access deleted URL
    const shortUrl = createdUrl.shortUrl;
    return request(shortUrl).get(`/`).expect(410);
  });

  // Expiration Handling
  it('should return 410 for expired URLs', async () => {
    // Create URL that expires immediately
    const expiredUrl = await request(app)
      .post('/api/r')
      .send({
        originalUrl: 'https://facebook.com',
        expiresAt: new Date(Date.now() - 1000), // Expired
      })
      .expect(201);

    const shortUrl = expiredUrl.body.shortUrl;

    return request(shortUrl).get('/').expect(410);
  });
});
