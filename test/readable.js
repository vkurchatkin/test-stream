require('should')

var Readable = require('./..').Readable
var Writable = require('./..').Writable

var buffer = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09])

describe('Readable', function () {
  it('should work as a function', function () {
    Readable(buffer).should.be.instanceOf(Readable)
  })

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

  it('should throw if no options passed', function () {
    function bang () {
      var rs = new Readable()
    }

    bang.should.throw()
  })

  it('should throw if no buffer passed', function () {
    function bang () {
      var rs = new Readable({})
    }

    bang.should.throw()
  })
})