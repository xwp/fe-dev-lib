'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.workflowName = exports.workflow = exports.tasks = exports.isTest = exports.isProd = exports.isDev = exports.env = exports.cwd = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _ConfigClass = require('./ConfigClass');

var _ConfigClass2 = _interopRequireDefault(_ConfigClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configFile = './package.json';
var configJSON = void 0,
    config = void 0;

if (!_fs2.default.existsSync(configFile)) {
	_gulpUtil2.default.log(_gulpUtil2.default.colors.red('Config file not found. Aborting...'));
	process.exit(1);
}

configJSON = JSON.parse(_fs2.default.readFileSync(configFile));
config = new _ConfigClass2.default(configJSON.workflows, _yargs2.default.argv);

var _config = config,
    cwd = _config.cwd,
    env = _config.env,
    isDev = _config.isDev,
    isProd = _config.isProd,
    isTest = _config.isTest,
    tasks = _config.tasks,
    workflow = _config.workflow,
    workflowName = _config.workflowName;
exports.cwd = cwd;
exports.env = env;
exports.isDev = isDev;
exports.isProd = isProd;
exports.isTest = isTest;
exports.tasks = tasks;
exports.workflow = workflow;
exports.workflowName = workflowName;