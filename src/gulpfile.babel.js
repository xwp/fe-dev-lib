import gulp from 'gulp';
import { preCheck } from './utils/pre-check';
import { tasks } from './utils/config';
import TaskDefinition from './classes/TaskDefinition';

// Check workflow setup.
preCheck();

// Get tasks.
const taskDefinition = new TaskDefinition( tasks );

// Define default task.
gulp.task( 'default', gulp.series( taskDefinition.gulpTasks ) );
