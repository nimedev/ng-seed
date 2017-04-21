# Change Log

## [2.0.0] - 2017-04-21

### Modified
- Breaking: change the way to export the config constants in app-config.


## [1.6.0] - 2017-04-20

### Modified
- Remove: .vscode folder.


## [1.5.1] - 2017-04-20

### Updated
- Upgrade devDep: babel-eslint eslint-config-nimedev-base tslint-config-nimedev webpack webpack-bundle-analyzer.


## [1.5.0] - 2017-04-11

### Modified
- Use @ngtools/webpack instead angular2-template-loader and awesome-typescript-loader in development.
- Use Object.freeze() in app-config.
- Move html content to template property.

### Updated
- Upgrade dep: @angular/common, @angular/core, @angular/platform-browser and @angular/router.
- Upgrade devDep: @angular/compiler, @angular/compiler-cli, @angular/platform-browser-dynamic, babel-core, babel-preset-es2015, babel-preset-stage-1, tslint, tslint-loader and typings.


## [1.4.2] - 2017-04-04

### Updated
- Upgrade devDep: webpack-kit-nimedev.


## [1.4.1] - 2017-04-04

### Fixed
- Order chunks in htmlPlugin block.

### Updated
- Upgrade dep: rxjs.
- Upgrade devDep: webpack.


## [1.4.0] - 2017-04-03

### Modified
- Move webpack environment variables to config folder.


## [1.3.0] - 2017-04-02

### Added
- Add webpack-bundle-analyzer to stats script.

### Fixed
- Bug: global styles don`t reload the browser when change.


## [1.2.0] - 2017-04-02

### Modified
- Use AOT only in production.


## [1.1.0] - 2017-04-02

### Added
- Implement AOT.

### Modified
- Separate global styles and component styles.
- Move polyfills to separate entry.
- Use extractVendor block.


## [1.0.0] - 2017-03-31

* Initial release.
