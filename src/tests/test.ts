import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = (): any => { /* no op */
};

// For the tests, we cannot read those value from a configuration file.
declare const global;
declare const ENV;
global['ENV'] = {protocol: 'http://', apiDomainName: 'test.com', apiPort: '80', apiVersion: 'v1'};
ENV.protocol = "http://";
ENV.apiDomainName = "test.com";
ENV.apiPort = "80";
ENV.apiVersion = "v1";

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
])
// First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then((context) => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);
