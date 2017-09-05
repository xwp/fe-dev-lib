'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var TaskDefinition = function () {

	/**
  * Load all Gulp tasks from `tasks` dir.
  *
  * @param {Object} tasks List of all tasks.
  */
	function TaskDefinition(tasks) {
		_classCallCheck(this, TaskDefinition);

		if (null === instance) {
			instance = this;
		}

		this._tasks = tasks;

		// Require all default tasks.
		(0, _requireDir2.default)(_path2.default.resolve(__dirname, '../tasks'));

		// Return the instance.
		return instance;
	}

	/**
  * Filter the list to only contain existing Gulp tasks.
  *
  * @param {Array} tasks Set of tasks.
  * @return {Array} Filtered array of tasks.
  */


	_createClass(TaskDefinition, [{
		key: 'filterTasks',
		value: function filterTasks(tasks) {
			return Object.keys(tasks).filter(function (task) {

				// Require custom task defined directly in the user's project.
				if (undefined !== tasks[task].taskSrc) {
					var taskSrc = _path2.default.resolve(tasks[task].taskSrc);

					if (!_fs2.default.existsSync(taskSrc)) {
						_gulpUtil2.default.log('No task has been found in \'' + _gulpUtil2.default.colors.red(taskSrc) + '\', ignoring!');
						return false;
					} else {
						var taskFn = require(taskSrc);
						_gulp2.default.task(task, taskFn);
					}
				}

				// Make sure each Gulp task is defined.
				if (undefined === _gulp2.default.task(task)) {
					_gulpUtil2.default.log('Task \'' + _gulpUtil2.default.colors.red(task) + '\' is not defined, ignoring!');
					return false;
				}

				return true;
			});
		}

		/**
   * Split tasks into 3 categories: main tasks, before and after.
   *
   * @param {Array} allTasks Set of all tasks
   * @param {Array} ignoredTasks Tasks to ignore
   * @return {{before: Array, tasks: Array, after: Array}} Categorized tasks object
   */

	}, {
		key: 'sortTasks',
		value: function sortTasks(allTasks, ignoredTasks) {
			var tasks = allTasks,
			    before = [],
			    after = [];

			if (undefined !== ignoredTasks) {
				tasks = tasks.filter(function (task) {
					return !ignoredTasks.includes(task);
				});
			}

			if (tasks.includes('clean')) {
				before.push('clean');
				tasks = tasks.filter(function (task) {
					return 'clean' !== task;
				});
			}

			if (tasks.includes('watch')) {
				after.push('watch');
				tasks = tasks.filter(function (task) {
					return 'watch' !== task;
				});
			}

			return { before: before, tasks: tasks, after: after };
		}
	}, {
		key: 'gulpTasks',
		get: function get() {
			var gulpTasks = [],
			    tasks = this._tasks;

			tasks = this.filterTasks(tasks);
			tasks = this.sortTasks(tasks, ['js-lint']);

			if (0 < tasks.before.length) {
				gulpTasks.push(_gulp2.default.parallel(tasks.before));
			}
			if (0 < tasks.tasks.length) {
				gulpTasks.push(_gulp2.default.parallel(tasks.tasks));
			}
			if (0 < tasks.after.length) {
				gulpTasks.push(_gulp2.default.parallel(tasks.after));
			}

			return gulpTasks;
		}
	}]);

	return TaskDefinition;
}();

exports.default = TaskDefinition;