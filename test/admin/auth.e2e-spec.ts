import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';

describe('Auth admin (e2e)', () => {
  const app = APP_URL;

  it('Login: /api/v1/auth/email/login (POST)', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200)
      .then(({ body }) => {
        expect(body.accessToken).toBeDefined();
        expect(body.user.email).toBeDefined();
        expect(body.user.role).toBeDefined();
      });
  });
});
