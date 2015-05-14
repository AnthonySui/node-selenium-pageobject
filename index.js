'use strict';

var extend = require('lodash/extend');

var proto = {

  visit: function () {
    return this.driver.get(this.url);
  },

  at: function () {
    var u = this.url;
    return this.driver.getCurrentUrl()
      .then(function (url) {
        return url === u;
      });
  }

};

module.exports = function createPageObject(definition) {
  var def = definition || {};

  if (!def.url) {
    throw new TypeError('Url should be specified');
  }

  if (!def.driver) {
    throw new TypeError('Webdriver should be specified');
  }

  var elements = def.elements || {};
  var pageObject = Object.create(proto);

  extend(pageObject, def);

  Object.keys(elements)
    .forEach(function (elementName) {
      Object.defineProperty(pageObject, elementName, {
        get: function () {
          return pageObject.driver.findElement(elements[elementName]);
        }
      });
    });

  if (def.openOnCreate) {
    pageObject.visit();
  }

  return pageObject;
};
