'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _getConfig = require('../utils/get-config');

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _TaskHelper = require('../utils/TaskHelper');

var _TaskHelper2 = _interopRequireDefault(_TaskHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_getConfig.tasks.clean) {
	var task = new _TaskHelper2.default({
		name: 'clean',
		requiredPaths: ['src'],
		config: _getConfig.tasks.clean
	});

	_gulp2.default.task(task.name, function (done) {
		if (task.isValid()) {
			(0, _del2.default)(task.src, { cwd: _getConfig.cwd }).then(function () {
				return done();
			});
		} else {
			done();
		}
	});
}