const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  bytesCouner = 0;
  limit = 0;

  constructor(options) {
    super(options);
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.bytesCouner += chunk.length;
    if (this.bytesCouner > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk.toString());
    }
  }
}

module.exports = LimitSizeStream;
