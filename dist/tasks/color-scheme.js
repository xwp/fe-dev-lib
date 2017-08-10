'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpPostcss = require('gulp-postcss');

var _gulpPostcss2 = _interopRequireDefault(_gulpPostcss);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _getConfig = require('../utils/get-config');

var _gulpStringReplace = require('gulp-string-replace');

var _gulpStringReplace2 = _interopRequireDefault(_gulpStringReplace);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpJsonModify = require('gulp-json-modify');

var _gulpJsonModify2 = _interopRequireDefault(_gulpJsonModify);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _TaskHelper = require('../utils/TaskHelper');

var _TaskHelper2 = _interopRequireDefault(_TaskHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_getConfig.tasks['color-scheme']) {
	var task = new _TaskHelper2.default({
		name: 'color-scheme',
		requiredPaths: ['src', 'dest', 'base'],
		config: _getConfig.tasks['color-scheme']
	});

	var buildMetaJSON = void 0,
	    compileSASS = void 0,
	    insertCSSintoJSON = void 0;

	buildMetaJSON = function buildMetaJSON(done) {
		if (!task.isValid()) {
			done();
		}

		var isFirst = true;

		return task.start().pipe((0, _gulpStringReplace2.default)(/([\n\r\t])/gm, '')).pipe((0, _gulpStringReplace2.default)(/(.+?)\/[\/*]\s?color-schema:start\s?(\*\/)?/gm, '{\n\t"fields": [')).pipe((0, _gulpStringReplace2.default)(/\/[\/*]\s?color-schema:end\s?(\*\/)?(.+)/gm, '\n\t],\n\t"css": ""\n}')).pipe((0, _gulpStringReplace2.default)(/\$u-([a-z\-]+):\s*(#[a-f0-9]{3,6});/gm, function (all, name, color) {
			var out = '';

			if (isFirst) {
				isFirst = false;
			} else {
				out += ',';
			}

			out += '\n\t\t{';
			out += '\n\t\t\t"name": "' + name + '",';
			out += '\n\t\t\t"default": "' + color + '"';
			out += '\n\t\t}';

			return out;
		})).pipe((0, _gulpRename2.default)(function (path) {
			path.basename = 'schema';
			path.extname = '.json';
		})).pipe(task.end());
	};

	compileSASS = function compileSASS(done) {
		if (!task.isValid()) {
			done();
		}

		return task.start().pipe((0, _gulpStringReplace2.default)(/^\$u-([a-z\-]+):\s*(#[a-f0-9]{3,6});/gm, function (all, name) {
			return '$u-' + name + ': #u-' + name + ';';
		})).pipe((0, _gulpSass2.default)({
			includePaths: undefined !== task.config.cssIncludePaths ? task.config.cssIncludePaths : [],
			outputStyle: 'compressed'
		}).on('error', _gulpSass2.default.logError)).pipe((0, _gulpPostcss2.default)([(0, _autoprefixer2.default)()])).pipe((0, _gulpStringReplace2.default)(/#u-([a-z\-]+)/gm, function (all, name) {
			return '$' + name;
		})).pipe((0, _gulpRename2.default)(function (path) {
			path.basename = '_schema';
			path.extname = '.css';
		})).pipe(task.end());
	};

	insertCSSintoJSON = function insertCSSintoJSON() {
		var destPath = (0, _path.join)(_getConfig.cwd, task.dest),
		    cssPath = (0, _path.join)(destPath, '_schema.css'),
		    jsonPath = (0, _path.join)(destPath, 'schema.json'),
		    css = _fsExtra2.default.readFileSync(cssPath, 'utf-8');

		_fsExtra2.default.removeSync(cssPath);

		return _gulp2.default.src(jsonPath).pipe((0, _gulpJsonModify2.default)({
			key: 'css',
			value: css
		})).pipe(task.end());
	};

	_gulp2.default.task('color-scheme', _gulp2.default.series(_gulp2.default.parallel(buildMetaJSON, compileSASS), insertCSSintoJSON));
}