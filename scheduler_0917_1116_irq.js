// 代码生成时间: 2025-09-17 11:16:11
const { setTimeout } = require('timers');

/**
 * Task schedule object.
 * @typedef {Object} Task
 * @property {Function} callback - The function to be executed when the task runs.
 * @property {number} interval - The interval in milliseconds at which the task should run.
 */

/**
 * Scheduler class for managing and executing tasks.
 */
class Scheduler {
  /**
   * Creates a new Scheduler instance.
   */
  constructor() {
    this.tasks = [];
  }

  /**
   * Adds a new task to the scheduler.
   * @param {Task} task - The task to be scheduled.
   * @returns {void}
   */
  addTask(task) {
    this.tasks.push(task);
    this.runTask(task);
  }

  /**
   * Runs a task and schedules its next execution.
   * @param {Task} task - The task to be executed.
   * @returns {void}
   */
  runTask(task) {
    try {
      task.callback();
      setTimeout(() => {
        this.runTask(task);
      }, task.interval);
    } catch (error) {
      console.error(`Error running task: ${error.message}`);
    }
  }

  /**
   * Removes a task from the scheduler.
   * @param {Function} callback - The callback function of the task to be removed.
   * @returns {void}
   */
  removeTask(callback) {
    this.tasks = this.tasks.filter(task => task.callback !== callback);
  }
}

// Example usage:

// Create a new scheduler instance
const scheduler = new Scheduler();

// Define a task
const task = {
  callback: () => {
    console.log('Task executed');
  },
  interval: 2000 // Every 2 seconds
};

// Add the task to the scheduler
scheduler.addTask(task);

// After some time, remove the task if needed
// setTimeout(() => {
//   scheduler.removeTask(task.callback);
// }, 10000); // Remove after 10 seconds