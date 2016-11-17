/**
 * Test File: Testing EntryController
 * File location: test/controllers/EntryController.spec.js
 */
var EntryController = require('../../../api/controllers/EntryController.js'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The Entry Controller', function() {
  describe('when we invoke the index action', function() {
    it('should return the list of entries', function() {

      // Mocking res.view() method by using a sinon spy
      var view = sinon.spy();

      // Executes controller action
      EntryController.index(null, view);
      console.log(view.called);
      console.log(view.args);
      console.log(view.returnvalues);
      // Asserts view() method was called
      assert(view.called);

    });
  });
});
