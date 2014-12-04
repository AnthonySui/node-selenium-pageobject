Page Object for node webdriver
==============================

The package provides base page object pattern that can be used in acceptance tests with selenium.

# Installation

```
npm i -D maxmalov/node-selenium-pageobject
```

# Example usage

```
var PageObject = require('pageobject');
var wd = require('selenium-webdriver');

var MyLoginPage = PageObject.extend({

    url: 'http://localhost/login',

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

var driver = new wd.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(wd.Capabilities.chrome())
    .build();

var loginPage = new MyLoginPage(driver);

loginPage.visit();
loginPage.login();
```