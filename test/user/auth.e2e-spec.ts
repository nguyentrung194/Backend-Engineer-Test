import request from 'supertest';
import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';

describe('Auth user (e2e)', () => {
  const app = APP_URL;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;

  // create new user
  it('Create new user: /api/v1/auth/user/register (POST)', async () => {
    return request(app)
      .post('/api/v1/auth/user/register')
      .send({
        email: newUserEmail,
        password: newUserPassword,
        username: `User.${Date.now()}`,
        firstName: 'Tester',
        lastName: 'E2E',
      });
  });

  it('Login: /api/v1/auth/user/login (POST)', () => {
    return request(app)
      .post('/api/v1/auth/user/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .expect(200)
      .then(({ body }) => {
        expect(body.accessToken).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        expect(body.tokenExpires).toBeDefined();
        expect(body.user.email).toBeDefined();
        expect(body.user.password).not.toBeDefined();
        expect(body.user.previousPassword).not.toBeDefined();
      });
  });

  it('Do not allow register user with exists email: /api/v1/auth/user/register (POST)', () => {
    return request(app)
      .post('/api/v1/auth/user/register')
      .send({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
        firstName: 'Tester',
        lastName: 'E2E',
      })
      .expect(422)
      .then(({ body }) => {
        expect(body.errors.email).toBeDefined();
      });
  });

  it('Confirmed user retrieve profile: /api/v1/auth/me (GET)', async () => {
    const newUserApiToken = await request(app)
      .post('/api/v1/auth/user/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .then(({ body }) => body.accessToken);

    await request(app)
      .get('/api/v1/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send()
      .then(({ body }) => {
        expect(body.email).toBeDefined();
        expect(body.hash).not.toBeDefined();
        expect(body.password).not.toBeDefined();
        expect(body.previousPassword).not.toBeDefined();
      });
  });

  it('Refresh token: /api/v1/auth/refresh (GET)', async () => {
    const newUserRefreshToken = await request(app)
      .post('/api/v1/auth/user/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => {
        return body.refreshToken;
      });

    await request(app)
      .post('/api/v1/auth/refresh')
      .auth(newUserRefreshToken, {
        type: 'bearer',
      })
      .send()
      .then(({ body }) => {
        expect(body.accessToken).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        expect(body.tokenExpires).toBeDefined();
      });
  });

  it('New user update profile: /api/v1/auth/me (PATCH)', async () => {
    const newUserNewName = Date.now();
    const newUserNewPassword = 'new-secret';
    const newUserApiToken = await request(app)
      .post('/api/v1/auth/user/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.accessToken);

    await request(app)
      .patch('/api/v1/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({
        firstName: newUserNewName,
        password: newUserNewPassword,
      })
      .expect(422);

    await request(app)
      .patch('/api/v1/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({
        firstName: newUserNewName,
        password: newUserNewPassword,
        oldPassword: newUserPassword,
      })
      .expect(200);

    await request(app)
      .post('/api/v1/auth/user/login')
      .send({ email: newUserEmail, password: newUserNewPassword })
      .expect(200)
      .then(({ body }) => {
        expect(body.accessToken).toBeDefined();
      });

    await request(app)
      .patch('/api/v1/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({ password: newUserPassword, oldPassword: newUserNewPassword })
      .expect(200);
  });
});
