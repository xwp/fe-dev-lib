'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _config = require('../utils/config');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_config.tasks.watch && 0 < _config.tasks.watch.length) {
	_gulp2.default.task('watch', function () {

		// Omit some tasks, e.g. `js` is already watched by Webpack.
		var ignoredTasks = ['clean'],
		    filteredTasks = _config.tasks.watch.filter(function (task) {
			return !ignoredTasks.includes(task);
		});

		filteredTasks.forEach(function (taskSlug) {
			var task = _config.tasks[taskSlug];

			if (undefined === task.src) {
				return;
			}

			if (Array.isArray(task.src)) {
				task.src.map(function (src) {
					return _gulp2.default.watch((0, _path.join)(_config.cwd, src), _gulp2.default.parallel(taskSlug));
				});
			} else {
				_gulp2.default.watch((0, _path.join)(_config.cwd, task.src), _gulp2.default.parallel(taskSlug));
			}
		});
	});
}