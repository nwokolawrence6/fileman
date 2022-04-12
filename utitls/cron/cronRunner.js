// Call all your cron jobs here
const scheduler = require('./scheduler/sheduler.cron');
const clearRedundancy = require('./cron-jobs/clearRedundancy.cron');

// Run the clearRedundancy cron job
scheduler(8.64e+7, clearRedundancy);