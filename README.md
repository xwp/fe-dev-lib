fe-dev-lib
==========

**Common tools to facilitate the front-end development of WordPress themes and plugins.**

## Installation

### Prerequisites

**The package requires Node version at least 6.11**.

If you're using an older version of Node, update it first
or use [NVM](https://github.com/creationix/nvm) to conveniently manage multiple Node instances.

### Install as NPM package

To install with NPM run:

```bash
npm install --save-dev https://github.com/xwp/fe-dev-lib 
```

or, using [Yarn](https://yarnpkg.com):

```bash
yarn add -D https://github.com/xwp/fe-dev-lib 
```

### Setup linters and browsers list

Copy `.eslintrc` and `.stylelintrc` to your project's root directory or add linting rules directly to the `package.json` file.

Add a [`browserslist`](https://github.com/ai/browserslist) to your `package.json` file, e.g.:

```json
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions",
    "last 2 Opera versions",
    "last 2 iOS versions",
    "last 1 Android version",
    "last 1 ChromeAndroid version",
    "ie 11",
    "> 1%"
  ]
```

### Setup scripts

Add build scripts to the `scripts` section of your `package.json`, e.g.:

```JSON
"scripts": {
    "compile": "gulp --gulpfile ./node_modules/fe-dev-lib/dist/gulpfile.js --cwd ./ --workflow=my-theme --env=dev",
}
```

You can use multiple scripts.

**The reference of flags used in the script:**

#### `--gulpfile`
*Required:* path to the Gulpfile inside `fe-dev-lib` package.

#### `--cwd`
*Required:* current working directory path. Should be set to the project's root, i.e. `./`

#### `--env=dev`
*Optional:* environment name.

* Accepted values: `dev`, `prod`, `test`
* Default: `dev`

#### `--workflow`
*Optional:* workflow name that should match an entry in the `workflows` object in the `package.json`.

If not provided, the script assumes there is only one workflow located in the root of the `workflows` object.

In order to run a script use:

```bash
npm run compile
```

or, with Yarn:

```bash
yarn run compile
```

where `compile` is the script name.

## Workflows

With `fe-dev-lib` you can define multiple workflows that would serve different needs for you.
For instance, you can defined a `theme` workflow that will compile SCSS, JS and copy assets in your theme,
while a `plugin` workflow will perform tasks needed in the WordPress plugin development.

Workflow is of the following form:

```json
"workflows": {
  "my-theme": {
    "cwd": "wp-content/themes/my-theme/assets",
    "schema": "default"
    "tasks": {
      ...
    }
  }
}
```

**Workflow properties:**

#### `my-theme`
*Optional:* workflow name that you reference in the `scripts` section with `--workflow` flag.

If no workflow name is provided (i.e. workflow definition is at the root of the `workflows` object), you don't have to provide `--workflow` flag in the script.

#### `cwd`
*Optional:* path to the root of your workflow.

#### `schema`
*Optional:* schema name.
Schemas are predefined templates located in `fe-dev-lib/schemas`.

#### `tasks`
*Optional:* tasks definitions and overrides of the `schema` tasks (if schema is used).

### Using schemas


### Overriding tasks


## Tasks reference

### `clean`
### `copy`
### `css`
### `images`
### `js`
### `watch`

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
