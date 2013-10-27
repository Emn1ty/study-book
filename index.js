"use strict";

var stream = require('stream');

var stdin = process.openStdin();
var transform = stream.Transform();

stdin.on('data', function(chunk) {
	process.stdout.write(chunk.toString().toUpperCase());
});