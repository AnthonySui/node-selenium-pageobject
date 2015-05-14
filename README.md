Page Object for node webdriver
==============================

The package provides page object pattern that can be used in acceptance tests with selenium.

# Installation

```
npm i -D maxmalov/node-selenium-pageobject
```

# Example usage

```
var createPageObject = require('pageobject');
var wd = require('selenium-webdriver');

var driver = new wd.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(wd.Capabilities.chrome())
    .build();

var myLoginPage = createPageObject({
    url: 'http://localhost/login',

    driver: driver,

    elements: {
      login: wd.By.name('login'),
      password: wd.By.name('password'),
      submit: wd.By.name('submit')
    },

    login: function (login, password) {
      this.login.sendKeys(login);
      this.password.sendKeys(password);
      return this.submit.click();
    }
});

loginPage.visit();
loginPage.login();
```

# Documentation

Package provides factory function to create page objects. The factory accepts page object definition object:

#### definition.url (required)

The page url.

#### definition.driver (required)

The webdriver instance.

#### definition.elements (optional, default = {})

The object that contains webdriver selectors for page elements. All these elements will be accessible from page object instance.

```
var wd = require('selenium-webdriver');

var page = createPageObject({

    // ...
    elements: {
        button: 'button',
        nameField: wd.By.name('firstName')
    }

});

page.visit();

page.nameField.sendKeys('Max');
page.button.click();

```

#### definition.openOnCreate (optional, default = false)

Indicates whether page should be opened after creation or not.

#### definition.*

All other properties will be mixed into page object instance.
