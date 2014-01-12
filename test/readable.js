require('should')

var Readable = require('./../lib/readable.js')
var Writable = require('./../lib/writable.js')

var buffer = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09])

describe('Readable', function () {
  it('should stream buffer', function (done) {
    var rs = new Readable(buffer)
    var ws = new Writable

    ws.on('finish', onFinish)

    rs.pipe(ws)

    function onFinish () {
      ws.toBuffer().should.eql(buffer)
      done()
    }
  })
})