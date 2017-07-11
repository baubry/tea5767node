var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

var TEA5767_ADDR = 0x60
var buf=new Buffer(5);
i2c1.i2cRead(TEA5767_ADDR, 5, buf, ()=>{
  console.log("config received "+buf.length);
  console.log(buf[0]);
  console.log(buf[1]);
  console.log(buf[2]);
  console.log(buf[3]);
  console.log(buf[4]);
});
i2c1.readByteSync(TEA5767_ADDR, CMD_ACCESS_CONFIG);