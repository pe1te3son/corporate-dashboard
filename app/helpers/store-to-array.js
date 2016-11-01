import Ember from 'ember';

export function storeToArray (params/*, hash*/) {
  console.log(params);
  let data = [];
  params[0].map((item) => {
    let itemFormated = item.toJSON();
    data.push([new Date(itemFormated.timestamp), itemFormated.paying_customers]);
  });
  return data;
}

export default Ember.Helper.helper(storeToArray);
