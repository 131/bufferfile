"use strict";

const path  = require('path');
const fs    = require('fs');

const expect = require('expect.js');
const bf     = require('../');

describe("basic test suite", function(){

  var buffer, challenge;

  it("should open mock file", function(){
    var mock_path = path.resolve(__dirname, 'mock.bin');
    buffer = new bf(mock_path, 'r');
    challenge = fs.readFileSync(mock_path);
  });

  it("should read a simple buffer", function(){
    var a = buffer.readUInt32BE();
    expect(a).to.eql(challenge.readUInt32BE());
  });


  it("should test with an offset", function(){
    var a = buffer.readUInt32BE(1);
    expect(a).to.eql(challenge.readUInt32BE(1));
  });


  it("should test seek", function(){
    buffer.seek(2);
    var a = buffer.readUInt32BE();
    expect(a).to.eql(challenge.readUInt32BE(2));
  });


  it("should test slice", function(){
    var a = buffer.slice(2,3);
    expect(a).to.eql(challenge.slice(2,3));
  });


  it("should test consume", function(){
    buffer.seek(1);
    var a = buffer.consumeShort();
    var b = buffer.consumeInt();
    expect(a).to.eql(challenge.readInt16BE(1));
    expect(b).to.eql(challenge.readInt32BE(1 + 2));
  });


  it("should test long", function(){
    buffer.seek(0);
    var c = buffer.consumeLong();
    expect(c).to.eql(challenge.slice(0, 8));
  });


  it("should test guid", function(){
    buffer.seek(0);
    var c = buffer.consumeGuid();
    expect(c).to.eql(challenge.slice(0, 16));
  });




});