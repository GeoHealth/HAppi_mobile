[![Build Status](https://travis-ci.org/GeoHealth/HAppi_mobile.svg?branch=master)](https://travis-ci.org/GeoHealth/HAppi_mobile)
[![Code Climate](https://codeclimate.com/github/GeoHealth/HAppi_mobile/badges/gpa.svg)](https://codeclimate.com/github/GeoHealth/HAppi_mobile)
[![Test Coverage](https://codeclimate.com/github/GeoHealth/HAppi_mobile/badges/coverage.svg)](https://codeclimate.com/github/GeoHealth/HAppi_mobile/coverage)
[![Issue Count](https://codeclimate.com/github/GeoHealth/HAppi_mobile/badges/issue_count.svg)](https://codeclimate.com/github/GeoHealth/HAppi_mobile)

# Health application that help keeping track of your symptoms.

A mobile application built using Ionic 2 that help patients to keep track of their symptoms appearance and share them with their doctors.

Play Store: https://play.google.com/store/apps/details?id=com.geohealth.happi

## Start the app
### In a browser
For development purposes, the application can be started from sources in a web browser.

    ionic serve
    
### In an emulator
For development purposes, the application can be started from sources in a mobile emulator

    ionic run android -l -c
    
## Build the app
### For Android
We have deployed the application on the Play Store only (for now).
To build the application, use

    ionic build android --prod --release
    
## Test the app

### Unit tests
Run unit tests with

    npm test
    
### End-to-End tests
Run e2e tests with

    npm run protractor

## Cloc report
To generate a report using [Cloc](https://github.com/AlDanial/cloc)

- Count the src with `cloc src --exclude-dir="tests"`
- Count the tests with `cloc src\tests`
