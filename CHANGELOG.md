# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/bohrsty/agenda-display/compare/v0.1.0...HEAD)
### Added
- settings ui (timeout and caldav connections)
- settings api endpoints
- check for settings json in redis
- api exception
- nanoid to generate ids
- agenda components
- date-fns for date manipulation
- api endpoint for agenda (data mocked)

### Changed
- redis image to redis-stack image (support for json module)
- LocalisationContext to provide date-fns locale

## [v0.1.0](https://github.com/bohrsty/agenda-display/compare/81c0b52...v0.1.0)
### Added
- settings page and buttons
- api utils
- base layout
- routing
- translation context and provider
- global state context and provider
- loading context and provider
- color mode context and provider
- material design
- redis client
- config api endpoint
- required packages and client and server endpoints
