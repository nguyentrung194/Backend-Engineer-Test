## [ADI Digi] Technical Test for Fullstack Developer

### Application Description

- Create a URL-shortener service to shorten URLs.
- API clients will be able to create short URLs from a full length URL.
- It will also support redirecting the short urls to the correct url.

### Application Functionalities

#### Url Shortening

- [x] An API Client can send a url and be returned a shortened URL.
- [x] An API Client can specify an expiration time for URLs when creating shortened URL.
- [x] Handle visits to Shortened URLs, they must redirect to the original URL with a HTTP 302 redirect, 404 if not found.
- [x] Visiting expired URLs must return HTTP 410.
- [x] Input URL should be validated and respond with error if not a valid URL.
- [x] Regex based blacklist for URLs, urls that match the blacklist respond with an error.
- [x] Hit counter for shortened URLs (increment with every hit).

#### Admin API

- [x] Admin api (requiring token) to list.
  - [x] Short Code.
  - [x] Full Url.
  - [x] Expiry (if any).
  - [x] Number of hits.
- [x] Above list can filter by Short Code and keyword on origin url.
- [x] Admin api to delete a URL (after deletion shortened URLs must return HTTP 410 on visit).

#### Bonus
- [x] Add a caching layer to avoid repeated database calls on popular URLs.
- [x] Add auto-generated OpenAPI documentation.

## API Documentation

### Using Swagger UI

1. Start the application server
2. Open your browser and navigate to `/docs`
3. The Swagger UI interface will display all available API endpoints with:
   - Detailed request/response schemas
   - Available HTTP methods
   - Required parameters and headers
   - Example requests and responses

You can test the API directly from the Swagger UI by:
1. Clicking on any endpoint to expand it
2. Clicking the "Try it out" button
3. Filling in the required parameters
4. Clicking "Execute" to send the request

For protected endpoints (Admin API), you'll need to:
1. Click the "Authorize" button at the top
2. Enter your API token
3. Click "Authorize" to use the token for all subsequent requests


## Quick run

```bash
git clone https://github.com/nguyentrung194/Backend-Engineer-Test.git
cd Backend-Engineer-Test
cp env-example .env
make build_base
make build
make install
```

## Module and Seed Generation

### Generating New Module

To create a new module with all necessary files (controller, service, entity, dto, etc.), use:

```bash
npm run seed:create-module <module-name>
```

Example:
```bash
npm run seed:create-module Blacklists
```

This will generate:

```
src/
└── blacklists/
  ├── dto/
  │ ├── create-blacklists.dto.ts
  │ └── update-blacklists.dto.ts
  ├── entities/
  │ └── blacklists.entity.ts
  ├── blacklists.controller.ts
  ├── blacklists.module.ts
  └── blacklists.service.ts
```

### Database Seeds

#### Creating New Seed

To generate a new database seed file:

```bash
npm run seed:create <module-name>
```

Example:
```bash
npm run seed:create Blacklists
```

This will create:
```
src/
└── database/
  └── seeds/
    └── blacklist-seed.module.ts
    └── blacklist-seed.service.ts
```
### Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api-backend && docker compose -p ci rm -svf
```
