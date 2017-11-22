'use strict';
const Browser = require('zombie');
const http = require('http');
const expect = require('chai').expect;
const app = require('../../app/app');
const mongoose = require('mongoose');


describe('Home page', function() {

  Browser.localhost('example.com', 3001)
  var browser = new Browser();

  before(function(done) {
    this.server = http.createServer(app).listen(3001);
    browser.visit('/', done);
  })


  it('should display the index page', function() {
    expect(browser.success);
  });

  it('has the relevant sign up links', function() {
    expect(browser.assert.link('a', 'Sign up here !', '/register'));
    expect(browser.assert.link('a', 'login', '/login'));
    expect(browser.assert.link('a', 'logout', '/logout'));
  });

  it('redirects to the register page when you click on signup', function(done) {
    browser.clickLink('Sign up here !', done);
    expect(browser.html('body')).to.contain('Admin');

  });

});




// it('has a button to Sign up here !', function () {
//     assert(this.browser.text('a'), 'Sign up here !');
// });
