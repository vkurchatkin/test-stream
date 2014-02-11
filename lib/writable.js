var inherits = require('util').inherits
var Writable = require('stream').Writable

function WritableTestStream (options) {
  if (!(this instanceof WritableTestStream)) return new WritableTestStream(options)
  Writable.call(this, options)
  this._chunks = []
}

inherits(WritableTestStream, Writable)

WritableTestStream.prototype._write = write
WritableTestStream.prototype.toBuffer = toBuffer

function write (chunk, encoding, callback) {
  this._chunks.push(chunk)
  process.nextTick(callback)
}

function toBuffer () {
  return Buffer.concat(this._chunks)
}

module.exports = WritableTestStream