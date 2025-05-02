import { deletePastEvents } from './controllers/eventController';

// Run the task every day at midnight
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const setupScheduledTasks = () => {
  // Run immediately on startup
  deletePastEvents();

  // Then schedule to run every day
  setInterval(deletePastEvents, ONE_DAY);
}; 