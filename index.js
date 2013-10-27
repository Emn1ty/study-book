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

// buffer
var Messanger = function Messanger() {
  stream.Transform.call(this);
  this._buffer = '';
  this._delimiter = '.';
};

Messanger.prototype = Object.create(stream.Transform.prototype, {constructor: {value: Messanger}});

Messanger.prototype._transform = function _transform(chunk, encoding, done) {
  var messages = this._getBufferedMessages(chunk);
  for (var i = 0; i < messages.length; i++) {
    this.push(messages[i] + this._delimiter + '\n');
  };
  this.on('end', function(){
    if (this._buffer.length > 0) { throw new Error("incomplete message still in buffer:" + this._buffer);}
  });
  done();
}

Messanger.prototype._getBufferedMessages = function _getBufferedMessages(chunk) {
  var temp = this._buffer + chunk.toString().replace(/\n$/, "");
  var messages = temp.split(this._delimiter);
  this._buffer = messages.pop();
  return messages;
}

// connect stream
process.stdin.pipe(new Messanger()).pipe(new Uppercaser()).pipe(new Doubler()).pipe(process.stdout);
