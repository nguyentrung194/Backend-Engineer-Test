---
inject: true
to: src\app.module.ts
before: \/\/ import space
---
import { <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Module } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module';