---
inject: true
to: src\app.module.ts
before: HomeModule,
---
    <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Module,