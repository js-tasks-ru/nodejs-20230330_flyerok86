const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  remainder = '';

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const lines = (this.remainder + chunk.toString()).split(os.EOL);

    this.remainder = lines.pop();

    lines.forEach((line) => this.push(line));

    callback();
  }

  _flush(callback) {
    this.push(this.remainder);
    callback();
  }
}

module.exports = LineSplitStream;
