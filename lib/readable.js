var inherits = require('util').inherits
var Readable = require('stream').Readable

function ReadableTestStream (options) {
  if (Buffer.isBuffer(options)) options = { buffer : options }
  if (!options) options = {}

  Readable.call(this, options)

  this._buffer = options.buffer

  this._sizeMin = options.sizeMin || 1
  this._sizeMax = options.sizeMax || this._sizeMin

  this._intervalMin = options.intevalMin || 0
  this._intervalMax = options.intevalMax || this._intervalMin

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
  var interval = random(stream._intervalMin, stream._intervalMax)

  setTimeout(function () {
    if (read(stream)) next(stream)
  }, interval)
}


/**
 * Read next chunk
 */

function read (stream) {
  var size = random(stream._sizeMin, stream._sizeMax)
  var offset = stream._offset + size

  stream.push(stream._buffer.slice(stream._offset, offset))

  stream._offset = offset

  if (offset >= stream._buffer.length) {
    stream.push(null)
    return false
  }

  return true
}

function random (from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

module.exports = ReadableTestStream