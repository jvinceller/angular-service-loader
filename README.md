# Angular Service Loader

This project uses currently Angular 13 and Jest 27 but would be able to run with even earlier versions.

The only consideration was to take the latest version of all, to be able to use the latest Jest test framework version.

But feel free to use the code in your existing older application.

## Valid commands to build, test and run

* `ng i --force` for installing dependencies. Currently it is only possible to build with <nobr>`--force`</nobr> because of dependencies that depending on slightly older versions of Angular. 
* `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
* `ng test` to execute the unit tests via [Jest](https://jestjs.io/).
