import Ember from 'ember';
import moment from 'npm:moment';

/**
* @name timeFormater
* @desc Return date formated based on option passed as second paramenter
* @requires moment.js
* @param { number } timestamp in miliseconds
* @param { string } moment.js date format
* @return string
*/
export function timeFormater (params) {
  return moment(parseInt(params[0])).format(params[1]);
}

export default Ember.Helper.helper(timeFormater);
