/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-dynamic-form',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/font-awesome/css/font-awesome.min.css');
    app.import('bower_components/font-awesome/fonts/FontAwesome.otf', {
      destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
      destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot', {
      destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', {
      destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {
      destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {
      destDir: 'fonts'
    });
  }
};
