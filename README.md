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

Copy `.eslintrc` and `.stylelintrc` to your project's root directory.

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

Because of the current `browserslist` limitations, it's not possible to use `.browserslistrc` config file.
You have to use `package.json`.

Please also note that you can define both ESLint and Stylelint setup directly inside `package.json` as well if you prefer.

### Setup scripts

Add build scripts to the `scripts` section of your `package.json`, e.g.:

```JSON
"scripts": {
    "compile": "gulp --gulpfile ./node_modules/fe-dev-lib/dist/gulpfile.js --cwd ./ --workflow=theme-name --env=dev",
}
```
The `--env` flag is optional and can be: `dev`, `prod` or `test`. It defaults to `dev`.

The `--workflow` flag should match a workflow definition in the `workflows` section (described in the following section).

You are free to add multiple scripts.

## Workflows

With `fe-dev-lib` you can define multiple workflows that would serve different needs for you.
For instance, you can defined a `theme` workflow that will compile SCSS, JS and copy assets in your theme,
while a `plugin` workflow will perform tasks needed in the WordPress plugin development.

Workflow has the following form:

```json
"workflows: {
  "theme-name": {
    "cwd": "wp-content/themes/my-theme/assets",
    "schema": "default"
    "tasks": {
      ...
    }
  }
  ...
}
```

Here's a short explanation of the properties used:
* `theme-name` - workflow name. It should match the name defined in the `scripts` entry.
* `cwd` - *optional:* path to the root of your workflow
* `schema` - *optional:* schema name. Schemas are predefined templates located in `fe-dev-lib/schemas`.
* `tasks` - *optional:* tasks definition or overrides if `schema` is used

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
