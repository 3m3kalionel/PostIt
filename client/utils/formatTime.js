import moment from 'moment';

/**
 * @method formatTime
 * @param {object} date 
 * @returns {string} returns the time the message is sent
 * @memberof MessageList
 */
const formatTime = (date) => {
  if (date) {
    const testTime = moment(date).fromNow().split(' ');
    let time = moment(date).fromNow();
    if (testTime.includes('hours') && testTime[0] < 23) {
      time = moment(date).calendar();
    } else if (testTime[0] > 23) {
      time = moment(date).fromNow();
    }
    return time;
  }
};

export default formatTime;
