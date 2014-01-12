require('should')

var Writable = require('./../lib/writable.js')

describe('Writable', function () {
  it('should bufferize stream', function (done) {
    var stream = new Writable

    stream.on('finish', onFinish)

    stream.write(new Buffer([0x01, 0x02, 0x03]))
    stream.write(new Buffer([0x04, 0x05]))
    stream.write(new Buffer([0x06, 0x07, 0x08, 0x09]))

    stream.end()

    function onFinish () {
      stream.toBuffer().should.eql(new Buffer([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09]))
      done()
    }
  })
})