# NG Seed

> A starting point for building web applications with Angular using Webpack and PostCSS.


## Table of Contents

  1. [Prerequisites](#prerequisites)
  1. [Install dependencies](#install-dependencies)
  1. [Workflow](#workflow)
  1. [Style Guides](#style-guides-and-linters-configuration)
  1. [Contributing](#contributing)
  1. [Changelog](#changelog)
  1. [Licencse](#license)


## Prerequisites

- [Node.js](https://nodejs.org/en/download/).
- [npm](https://www.npmjs.com/), installed with Node.js.


## Install dependencies

#### 1) Check `Node.js` version.

```sh
node --version
```
The version should be at or above 6.10

If you don't have Node.js installed go to [nodejs](https://nodejs.org/en/download/) and install the appropiate version or use [nvm](http://www.sergiolepore.net/2014/06/30/nvm-instalando-y-usando-node-version-manager/) (Recommended).

#### 2) Check `npm` version.

```sh
npm --version
```
The version should be at or above 5.0.0

Update npm version

```sh
npm install -g npm
```


## Workflow

  1. [Environment variables](#environment-variables)
  1. [Development workflow](#development-workflow)
  1. [Production workflow](#production-workflow)
  1. [Handle dependencies](#handle-dependencies)

### Environment variables

```sh
##
# ng-seed environment variables
##

# Host configuration
## Environment for server.
export NODE_ENV="development"
## Host of webapplication.
export NG_SEED_HOST=localIP
## Port of webapplication (Use in development).
export NG_SEED_PORT=3000
```

You can copy this script in bashrc file, modify the variables and delete variables that don't need modification or are undefined.

To change any of this variables:

```sh
export NG_SEED_PORT=8000
```

### Development workflow

#### Install the workspace dependencies.

```sh
# cd to project folder
npm install
```

#### Static server with live reload
Create a server using `webpack-dev-server` to serve the application in development environment.
The browser reloads the app when any file change:

```sh
# cd to project folder
npm start
```

After run the script, a message indicate the url to run the application in a browser.

### Production workflow

```sh
# cd to project folder
npm run build
```

After run this script the `dist` folder is ready for production.

### Handle dependencies
Follow this rules to update dependencies:

- Install dependencies

```sh
# To install production dependencies
# cd to project folder
npm install @angular/core

# To install development dependencies
# cd to project folder
npm install eslint -D
```

- Uninstall dependencies

```sh
# cd to project folder
npm uninstall @angular/core
```

- Check outdated dependencies

```sh
# cd to project folder
npm outdated --long
```

- **To Upgrade any dependencies follow `Uninstall dependencies` step and install again like `Install dependencies`.**


## Style Guides and Linters configuration

For TypeScript use [TSLint](https://palantir.github.io/tslint/) and [codelyzer](http://codelyzer.com/). Check the [tslint configuration file](tslint.json).

For JavaScript use [JavaScript Standard Style](https://standardjs.com/).

For CSS use [stylelint](https://stylelint.io/) as linter, [PostCSS](http://postcss.org/) to transform some CSS and [SuitCSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). Check the [stylelint configuration file](stylelint.config.js) and [postcss configuration file](postcss.config.js).

To run linters in console type:

```sh
# Run all linters
npm run lint

# Run only stylelint
npm run lint:css

# Run only standard for js files
npm run lint:js

# Run only tslint for ts files
npm run lint:ts
```


## [Contributing](CONTRIBUTING.md)


## [Changelog](CHANGELOG.md)


## [License](LICENSE.md)
