[bf](https://github.com/131/bufferfile) - a nodejs *file* descriptor abstraction that you can use with *[Buffer](https://nodejs.org/api/buffer.html)* signatures.

# Motivation
The stream API cannot seek easily, [bl](https://www.npmjs.com/package/bl) works fine, but load all your file in memory (that i cannot afford).
The fs API is "good enough" yet i need the buffer signatures (readUInt & co) - hence *bufferfile*.

[![Build Status](https://travis-ci.org/131/bufferfile.svg?branch=master)](https://travis-ci.org/131/bufferfile)
[![Coverage Status](https://coveralls.io/repos/github/131/bufferfile/badge.svg?branch=master)](https://coveralls.io/github/131/bufferfile?branch=master)
[![Version](https://img.shields.io/npm/v/bf.svg)](https://www.npmjs.com/package/bf)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)



# API/example
```
const bf = require('bf');

  //opens file descriptor
var file = new bf('somefile.txt', 'r');

  //read an int from fd
var int = file.readInt32BE(1024);


```
## Extra signatures
* buffer.close() - close the fd (!)

bufferfile provide an internal offset so you can 
* buffer.seek(pos)
* all readXX are based on the internal offet (as default default)
* all readXX are doubled with "consumeXX" signature that'll make the internal offset walk


# Credits
* [131](https://github.com/131) - author
* Joshua Holbrook who gave me the package name
* [bl](http://npmjs.com/package/bl) - good complementary
