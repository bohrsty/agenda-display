# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/bohrsty/agenda-display/compare/v0.2.0...HEAD)
### Added
- differentiation of all day events
- handling of multiple day events

### Changed
- typos
- look of all day events
- date and time format of multiple day events
- fixed dfns-options in AgendaItem

## [v0.2.0](https://github.com/bohrsty/agenda-display/compare/v0.1.0...v0.2.0)
### Added
- release script to prepare release locally
- detection of calendars in settings
- determination of text color according to background color in agenda item
- agenda length setting in api
- api endpoint to get dav calendars and entries
- function to parse dav, apply recurrence, merge calendars and sort events
- interval to refresh agenda every "timeout minutes"
- password field to calendar setting
- color picker
- colors in environment, config and global state
- settings ui (timeout and caldav connections)
- settings api endpoints
- check for settings json in redis
- api exception
- nanoid to generate ids
- agenda components
- date-fns for date manipulation
- api endpoint for agenda (data mocked)

### Changed
- default refresh interval to 60 to prevent infinite error loop
- dav calendar color cannot be empty (hide save button)
- npm dependencies for frontend only to be devDependencies
- calendar account settings to fetch calendars
- enable/disable fetched calendars and colorize them individually
- first agenda section to be named "today"
- agenda api result field names (from=start, to=end)
- agenda item to correspond with changed api result
- order and formatting of agenda item elements
- refresh button to refresh agenda manually
- api endpoint to encrypt password in redis
- optimized error handling using api calls in ui
- caldav connection form to add color
- config api endpoint to deliver calendar colors
- jsdoc to reflect function type correctly in contexts
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
