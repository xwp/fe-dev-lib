'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _getConfig = require('../utils/get-config');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_getConfig.tasks.watch && 0 < _getConfig.tasks.watch.length) {
	_gulp2.default.task('watch', function () {

		// Omit some tasks, e.g. `js` is already watched by Webpack.
		var ignoredTasks = ['js', 'js-lint', 'clean'],
		    filteredTasks = _getConfig.tasks.watch.filter(function (task) {
			return !ignoredTasks.includes(task);
		});

		filteredTasks.forEach(function (taskSlug) {
			var task = _getConfig.tasks[taskSlug];

			if (undefined === task.src) {
				return;
			}

			_gulp2.default.watch((0, _path.join)(_getConfig.cwd, task.src), _gulp2.default.parallel(taskSlug));
		});
	});
}