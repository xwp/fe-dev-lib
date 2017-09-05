'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _preCheck = require('./utils/pre-check');

var _config = require('./utils/config');

var _TaskDefinition = require('./classes/TaskDefinition');

var _TaskDefinition2 = _interopRequireDefault(_TaskDefinition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Check workflow setup.
(0, _preCheck.preCheck)();

// Get tasks.
var taskDefinition = new _TaskDefinition2.default(_config.tasks);

// Define default task.
_gulp2.default.task('default', _gulp2.default.series(taskDefinition.gulpTasks));