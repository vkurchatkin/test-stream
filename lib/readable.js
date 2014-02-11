var inherits = require('util').inherits
var Readable = require('stream').Readable

function ReadableTestStream (options) {
  if (!(this instanceof ReadableTestStream)) return new ReadableTestStream(options)

  options = options || {}
  if (Array.isArray(options)) options = { buffer : new Buffer(options) }
  if (Buffer.isBuffer(options)) options = { buffer : options }

  Readable.call(this, options)

  this._buffer = options.buffer

  this._size = options.size || 1

  this._interval = options.inteval || 0

  this._offset = 0;

  next(this)
}

inherits(ReadableTestStream, Readable)

ReadableTestStream.prototype._read = noop

function noop () {}


/**
 * Schedule next chunk
 */

function next (stream) {
  setTimeout(function () {
    if (read(stream)) next(stream)
  }, this._interval)
}


/**
 * Read next chunk
 */

function read (stream) {
  var size = stream._size
  var offset = stream._offset + size

  if (!stream._buffer) {
    stream.push(null)
    return false
  }

  stream.push(stream._buffer.slice(stream._offset, offset))

  stream._offset = offset

  if (offset >= stream._buffer.length) {
    stream.push(null)
    return false
  }

  return true
}

module.exports = ReadableTestStream