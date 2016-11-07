import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  init () {
    Ember.run.schedule('afterRender', () => {
      componentHandler.upgradeAllRegistered();
      $('.main-nav-link').click(function () {
        $('#current-page-title').text(
          $(this).children('.main-nav-link-name').text()
        );
      });
    });
  }
});
