'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpCached = require('gulp-cached');

var _gulpCached2 = _interopRequireDefault(_gulpCached);

var _gulpProgeny = require('gulp-progeny');

var _gulpProgeny2 = _interopRequireDefault(_gulpProgeny);

var _getConfig = require('../utils/get-config');

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpPostcss = require('gulp-postcss');

var _gulpPostcss2 = _interopRequireDefault(_gulpPostcss);

var _postcssCssnext = require('postcss-cssnext');

var _postcssCssnext2 = _interopRequireDefault(_postcssCssnext);

var _postcssPxtorem = require('postcss-pxtorem');

var _postcssPxtorem2 = _interopRequireDefault(_postcssPxtorem);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _postcssAssets = require('postcss-assets');

var _postcssAssets2 = _interopRequireDefault(_postcssAssets);

var _TaskHelper = require('../utils/TaskHelper');

var _TaskHelper2 = _interopRequireDefault(_TaskHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = new _TaskHelper2.default({
	name: 'css',
	requiredPaths: ['src', 'dest'],
	config: _getConfig.tasks
});

if (undefined !== task.config) {
	var fn = function fn(done) {
		if (!task.isValid()) {
			done();
		}

		return task.start()

		// Caching and incremental building (progeny) in Gulp.
		.pipe((0, _gulpIf2.default)(_getConfig.isDev, (0, _gulpCached2.default)(task.cacheName))).pipe((0, _gulpIf2.default)(_getConfig.isDev, (0, _gulpProgeny2.default)()))

		// Actual SASS compilation.
		.pipe((0, _gulpIf2.default)(_getConfig.isDev, _gulpSourcemaps2.default.init())).pipe((0, _gulpSass2.default)({
			includePaths: undefined !== task.config.includePaths ? task.config.includePaths : [],
			outputStyle: _getConfig.isDev ? 'expanded' : 'compressed'
		}).on('error', _gulpSass2.default.logError)).pipe((0, _gulpIf2.default)(task.config.postcssProcessors, (0, _gulpPostcss2.default)(getProcessors(task.config.postcssProcessors)))).pipe((0, _gulpIf2.default)(_getConfig.isDev, _gulpSourcemaps2.default.write(''))).pipe(task.end());
	};

	fn.displayName = 'css-compile';

	if (true === task.config.enableLinter) {
		_gulp2.default.task('css', _gulp2.default.series('css-lint', fn));
	} else {
		_gulp2.default.task('css', fn);
	}
}

function getProcessors() {
	var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var processors = [];

	if (undefined !== settings.cssnext) {
		processors.push((0, _postcssCssnext2.default)(settings.cssnext));
	}
	if (undefined !== settings.autoprefixer) {
		processors.push((0, _autoprefixer2.default)(settings.autoprefixer));
	}
	if (undefined !== settings.pxtorem) {
		processors.push((0, _postcssPxtorem2.default)(settings.pxtorem));
	}
	if (undefined !== settings.assets) {
		processors.push((0, _postcssAssets2.default)(settings.assets));
	}

	return processors;
}