/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: "corporate-dashboard",
    environment,
    rootURL: "/",
    locationType: "auto",
    dashboardAppGoogleApiKey: "AIzaSyCjI_zCU8lbou6wHIq66iZ8t-yFp2UWh4c",
    firebase: {
      apiKey: "AIzaSyAeBoj-b6_kYcO_6Q5HGW4Ly-fTB2gJzTE",
      authDomain: "corporate-dashboard-babb3.firebaseapp.com",
      databaseURL: "https://corporate-dashboard-babb3.firebaseio.com",
      storageBucket: "corporate-dashboard-babb3.appspot.com",
      messagingSenderId: "16098560508"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. "with-controller": true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
  }

  // if (environment === "production") {
  //
  // }

  return ENV;
};
