"use strict";

const fs = require('fs');

class buffer {
  constructor(file_path, mode) {
    this.fd = fs.openSync(file_path, mode);
    this.pos = 0;
  }


  read(size, pos) {
    var out = Buffer.alloc(size);
    fs.readSync(this.fd, out, 0, size, pos == undefined ? this.pos : pos);
    return out;
  }

  readInt16BE(pos)  {  return this.read(2, pos).readInt16BE(); }
  readInt32BE(pos)  {  return this.read(4, pos).readInt32BE(); }
  readUInt32BE(pos) {  return this.read(4, pos).readUInt32BE  (); }

  consumeShort() { return this.readInt16BE( (this.pos+=2) - 2); }
  consumeInt() { return this.readInt32BE( (this.pos+=4) - 4); }
  consumeLong() { return this.read(8, (this.pos+=8) - 8); }
  consumeGuid() { return this.read(16, (this.pos+=16) - 16); }

  slice(start, end) {
    return this.read(end - start, start);
  }

  seek(pos) {
    this.pos = pos;
  }

}



module.exports =  buffer;