'use strict';

var Base = require('class-extend');

module.exports = Base.extend({

  elements: {},

  url: '',
  title: '',

  constructor: function (driver) {
    this.driver = driver;
    this._initElements();
  },

  _initElements: function () {
    Object.keys(this.elements).forEach(function (elementKey) {
      Object.defineProperty(this, elementKey, {
        get: function () {
          return this.driver.findElement(this.elements[elementKey]);
        }
      });
    }, this);
  },

  visit: function () {
    return this.driver.get(this.url);
  }

});
