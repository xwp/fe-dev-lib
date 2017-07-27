'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigClass = function () {
	function ConfigClass() {
		var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var argv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, ConfigClass);

		this.config = config;
		this.argv = argv;
	}

	_createClass(ConfigClass, [{
		key: 'env',
		get: function get() {
			var argvEnv = this.argv.env;

			if (['test', 'prod', 'dev'].includes(argvEnv)) {
				return argvEnv;
			} else if ('production' === argvEnv) {
				return 'prod';
			} else {
				return 'dev';
			}
		}
	}, {
		key: 'isProd',
		get: function get() {
			return 'prod' === this.env;
		}
	}, {
		key: 'isDev',
		get: function get() {
			return 'dev' === this.env;
		}
	}, {
		key: 'isTest',
		get: function get() {
			return 'test' === this.env;
		}
	}, {
		key: 'workflowName',
		get: function get() {
			return undefined === this.argv.workflow ? '' : this.argv.workflow;
		}
	}, {
		key: 'workflow',
		get: function get() {
			if ('' !== this.workflowName && undefined !== this.config[this.workflowName]) {
				return this.config[this.workflowName];
			} else if (undefined !== this.config.tasks) {
				return this.config;
			} else {
				return {};
			}
		}
	}, {
		key: 'cwd',
		get: function get() {
			return undefined === this.workflow.cwd ? '' : this.workflow.cwd;
		}
	}, {
		key: 'schema',
		get: function get() {
			var schemaPath = function schemaPath(file) {
				return (0, _path.resolve)(__dirname, '../../schemas/' + file + '.json');
			};
			var path = '';

			if (_fs2.default.existsSync(this.workflow.schema)) {
				path = this.workflow.schema;
			} else if (_fs2.default.existsSync(schemaPath(this.workflow.schema))) {
				path = schemaPath(this.workflow.schema);
			} else {
				return false;
			}

			return JSON.parse(_fs2.default.readFileSync(path));
		}
	}, {
		key: 'tasks',
		get: function get() {
			var tasks = this.workflow.tasks;

			if (this.schema) {
				for (var name in this.schema) {
					if (undefined === tasks[name]) {
						tasks[name] = this.schema[name];
					} else if (null === tasks[name]) {
						delete tasks[name];
					} else {
						tasks[name] = Object.assign({}, this.schema[name], tasks[name]);
					}

					for (var prop in tasks[name]) {
						if (null === tasks[name][prop]) {
							delete tasks[name][prop];
						}
					}
				}
			}

			return tasks;
		}
	}]);

	return ConfigClass;
}();

exports.default = ConfigClass;
;