import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';
import request from 'supertest';
import { RoleEnum } from '../../src/roles/roles.enum';
import { StatusEnum } from '../../src/statuses/statuses.enum';

describe('Users admin (e2e)', () => {
  const app = APP_URL;
  const newUserEmailFirst = `user-first.${Date.now()}@example.com`;
  const newUserPasswordFirst = `secret`;
  const newUserChangedPasswordFirst = `new-secret`;
  const newUserByAdminEmailFirst = `user-created-by-admin.${Date.now()}@example.com`;
  const newUserByAdminPasswordFirst = `secret`;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.accessToken;
      });
  });

  it('Change password for new user: /api/v1/users/:id (PATCH)', async () => {
    let newUserFirst;
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: newUserEmailFirst,
        password: newUserPasswordFirst,
        username: `First${Date.now()}`,
        firstName: `First${Date.now()}`,
        lastName: 'E2E',
      });
    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: newUserEmailFirst, password: newUserPasswordFirst })
      .then(({ body }) => {
        newUserFirst = body.user;
      });
    return request(app)
      .patch(`/api/v1/users/${newUserFirst.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ password: newUserChangedPasswordFirst })
      .expect(200);
  });

  it('Login via registered user: /api/v1/auth/login (POST)', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: newUserEmailFirst, password: newUserChangedPasswordFirst })
      .expect(200)
      .expect(({ body }) => {
        expect(body.accessToken).toBeDefined();
      });
  });

  it('Fail create new user by admin: /api/v1/users (POST)', async () => {
    return request(app)
      .post(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ email: 'fail-data' })
      .expect(422);
  });

  it('Success create new user by admin: /api/v1/users (POST)', async () => {
    return request(app)
      .post(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
        username: `UserByAdmin${Date.now()}`,
        firstName: `UserByAdmin${Date.now()}`,
        lastName: 'E2E',
        role: {
          id: RoleEnum.user,
        },
        status: {
          id: StatusEnum.active,
        },
      })
      .expect(201);
  });

  it('Login via created by admin user: /api/v1/auth/login (GET)', async () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.accessToken).toBeDefined();
      });
  });

  it('Get list of users by admin: /api/v1/users (GET)', async () => {
    return request(app)
      .get(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .send()
      .then(({ body }) => {
        expect(body.results[0].email).toBeDefined();
        expect(body.results[0].password).not.toBeDefined();
        expect(body.results[0].previousPassword).not.toBeDefined();
      });
  });
});
