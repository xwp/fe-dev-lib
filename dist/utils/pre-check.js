'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.preCheck = undefined;

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preCheck = exports.preCheck = function preCheck() {
	if (undefined !== _config.workflowName) {
		_gulpUtil2.default.log('Using \'' + _gulpUtil2.default.colors.yellow(_config.workflowName) + '\' workflow...');
	}
	if (undefined !== _config.env) {
		_gulpUtil2.default.log('Using \'' + _gulpUtil2.default.colors.yellow(_config.env) + '\' environment...');
	}
};