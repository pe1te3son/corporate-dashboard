import Ember from 'ember';

export default Ember.Service.extend({
  intervalDefault: function () {
    return 5000; // Time between polls (in ms)
  }.property().readOnly(),

  schedulePollEvent (event, interval) {
    var eventInterval = interval || this.get('intervalDefault');
    return Ember.run.later(() => {
      event.apply(this);
      this.set('timer', this.schedulePollEvent(event));
    }, eventInterval);
  },

  startPolling (interval) {
    this.set('timer', this.schedulePollEvent(this.get('onPoll'), interval));
  },

  stopPolling () {
    Ember.run.cancel(this.get('timer'));
  },

  onPoll () {
    throw new Error('[Poller Service] require to set onPoll');
  }
});
