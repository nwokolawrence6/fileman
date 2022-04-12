/* 
* Call the scheduler function with the TIME in ms and the FN to execute
*/

const scheduler = (time, fn) => {
  
  setInterval(fn, time)
  
};

process.nextTick(() => scheduler);

module.exports = scheduler;