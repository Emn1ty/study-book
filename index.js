// require stream
var stream = require('stream');

// uppercaser stream
var Uppercaser = function Uppercaser() {
  stream.Transform.call(this);
};

// inherit from stream.Transform class and reassing name to original class
Uppercaser.prototype = Object.create(stream.Transform.prototype, {constructor: {value: Uppercaser}});

// create transform definition
Uppercaser.prototype._transform = function _transform(chunk, encoding, done) {
  this.push(chunk.toString().toUpperCase());
  done();
};

// uppercaser stream
var Doubler = function Doubler() {
  stream.Transform.call(this);
};

// inherit from stream.Transform class and reassing name to original class
Doubler.prototype = Object.create(stream.Transform.prototype, {constructor: {value: Uppercaser}});

// create transform definition
Doubler.prototype._transform = function _transform(chunk, encoding, done) {
  this.push(chunk.toString());
  this.push(chunk.toString());
  done();
};


// connect stream
process.stdin.pipe(new Uppercaser()).pipe(new Buffer()).pipe(process.stdout);
