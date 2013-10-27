"use strict";

// require stream
var stream = require('stream');

// create input stream
var stdin = process.openStdin();

// create transform stream
var uppercase = new stream.Transform({decodeStrings: false});

uppercase._transform = function (chunk, encoding, done) {
  done(null, chunk.toString().toUpperCase());
};

stdin.on('data', function (chunk) {
  this.pipe(uppercase);
});
