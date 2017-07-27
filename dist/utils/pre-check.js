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
	if (undefined === _getConfig.workflowName) {
		_gulpUtil2.default.log('Using \'' + _gulpUtil2.default.colors.yellow(_getConfig.workflowName) + '\' workflow...');
	}
	if (undefined !== _getConfig.env) {
		_gulpUtil2.default.log('Using \'' + _gulpUtil2.default.colors.yellow(_getConfig.env) + '\' environment...');
	}
};