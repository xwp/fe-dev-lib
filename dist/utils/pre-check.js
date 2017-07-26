'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.preCheck = undefined;

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _getConfig = require('./get-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preCheck = exports.preCheck = function preCheck() {
	var exitCode = 1;

	if (undefined === _getConfig.workflow) {
		_gulpUtil2.default.log(_gulpUtil2.default.colors.red('No workflow provided, aborting!'));
		process.exit(exitCode);
	} else {
		_gulpUtil2.default.log('Using \'' + _gulpUtil2.default.colors.yellow(_getConfig.workflow) + '\' workflow...');
	}

	if (undefined !== _getConfig.env) {
		_gulpUtil2.default.log('Using \'' + _gulpUtil2.default.colors.yellow(_getConfig.env) + '\' environment...');
	}
};