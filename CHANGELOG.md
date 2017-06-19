# Change Log

## [3.3.0] - 2017-06-19

### Added
- Add inline entry point and ProgressPlugin to webpack configuration.

### Deleted
- Remove pre-commit hook.

### Updated
- Upgrade to Angular v4.2.3.
- Upgrade dep: rxjs.
- Upgrade devDep: stylelint.


## [3.2.0] - 2017-06-11

### Modified
- Organize styles settings by modules.

### Updated
- Upgrade dep: zone.js.
- Upgrade devDep: @ngtools/webpack babel-core stylelint tslint webpack-kit-nimedev.


## [3.1.2] - 2017-06-02

### Fixed
- Fix README.md documentation.

### Updated
- Upgrade devDep: eslint-plugin-import tslint.


## [3.1.1] - 2017-05-31

### Modified
- Use install:dev script in build script.

### Fixed
- Fix bug in install:dev script.


## [3.1.0] - 2017-05-31

### Added
- Implement codelyzer to check Angular style guide.

### Updated
- Upgrade devDep: @ngtools/webpack eslint-config-nimedev-base tslint typescript.


## [3.0.2] - 2017-05-30

### Fixed
- Fix eslint configuration in package.json.


## [3.0.1] - 2017-05-30

### Added
- Add documentation to handle dependencies sections.


## [3.0.0] - 2017-05-30

### Added
- Add table of content links to README.md.

### Modified
- [Breaking Change] Upgrade to npm v5.0.0 and update README.md documentation.
- Upgrade devDep: @ngtools/webpack eslint-config-nimedev-base eslint-plugin-import tslint tslint-config-nimedev typescript webpack webpack-kit-nimedev.

## [2.2.1] - 2017-05-22

### Updated
- Upgrade to Angular v4.1.3.
- Upgrade dep: rxjs zone.js.
- Upgrade devDep: autoprefixer postcss-calc postcss-color-function postcss-custom-media postcss-custom-properties postcss-import postcss-mixins postcss-nested webpack webpack-bundle-analyzer webpack-kit-nimedev.


## [2.2.0] - 2017-05-06

### Modified
- Improve webpack configuration.

### Updated
- Upgrade to Angular v4.1.1.
- Upgrade dep: zone.js.
- Upgrade devDep: tslint webpack webpack-kit-nimedev.


## [2.1.0] - 2017-05-02

### Modified
- Improve webpack configuratio to use lazy loading.

### Updated
- Upgrade dep: rxjs zone.js.
- Upgrade devDep: @ngtools/webpack babel-eslint postcss-nested tslint-loader typescript webpack-dev-server.
- Upgrade to Angular 4.1.0.


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
