# [ADI Digi] Technical Test for Fullstack Developer

## Application Description

- Create a URL-shortener service to shorten URLs.
- API clients will be able to create short URLs from a full length URL.
- It will also support redirecting the short urls to the correct url.

## Application Functionalities

### Url Shortening

- [x] An API Client can send a url and be returned a shortened URL.
- [x] An API Client can specify an expiration time for URLs when creating shortened URL.
- [x] Handle visits to Shortened URLs, they must redirect to the original URL with a HTTP 302 redirect, 404 if not found.
- [x] Visiting expired URLs must return HTTP 410.
- [x] Input URL should be validated and respond with error if not a valid URL.
- [ ] Regex based blacklist for URLs, urls that match the blacklist respond with an error.
- [x] Hit counter for shortened URLs (increment with every hit).

### Admin API

- [ ] Admin api (requiring token) to list.
  - [ ] Short Code.
  - [ ] Full Url.
  - [ ] Expiry (if any).
  - [ ] Number of hits.
- [ ] Above list can filter by Short Code and keyword on origin url.
- [ ] Admin api to delete a URL (after deletion shortened URLs must return HTTP 410 on visit).

### Bonus
- [ ] Add a caching layer to avoid repeated database calls on popular URLs.
- [ ] Add auto-generated OpenAPI documentation.
