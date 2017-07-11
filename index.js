var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

var TEA5767_ADDR = 0x60
var buf=new Buffer(5);
i2c1.i2cRead(TEA5767_ADDR, 5, buf, ()=>{
  console.log("config received "+buf.length);
  console.log("chip ID:"+(buf[3]+0x0f));

// ### Frequency ###
 let frequency = ((buf[0] & 0x3F) << 8) + buf[1];
  // Determine the current frequency using the same high side formula as above
  let cfreq=(frequency * 32768 / 4 - 225000) / 1000000;
 console.log(cfreq);

// ### Level ###
let level = buf[3]>>4;
console.log(level);

//### Stereo ####
let sf=buf[2]&0x80;
console.log(sf);

});
