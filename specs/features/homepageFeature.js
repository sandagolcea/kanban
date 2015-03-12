var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('Homepage', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'}   });
    client.init(done);
  });

  after(function(done) {
    client.end(done);
  });

  it('Displays Title',function (done) {
    client
      .url('http://localhost:8080/dashboard')
      .waitForVisible('body')
      .getTitle(function(err, title) {
        expect(err).to.not.be.true;
        expect(title).to.eql('Boards');
      }) 
      .call(done);
  });

  describe('when I want to create a new board', function () { 
    it('fill in the new board form', function (done) {
      client
      .url('http://localhost:8080/dashboard')
      .addValue('#new-board-field','Text Board')
      .submitForm('.new-board-form')
      .getText('.boards:last-of-type', function(err, boardNameArray) {
        expect(err).to.not.be.true;
        expect(boardNameArray[boardNameArray.length-1]).to.eql('Text Board');
      })
      .call(done);
    })
  })

});