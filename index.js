var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

var TEA5767_ADDR = 0x60

getChipId().then((id)=>{
  console.log("Chip Id: "+id);
});

getFrequency().then((freq)=>{
  console.log("Frequency: "+freq);
});

function getChipId(){
  return new Promise(function(resolve,reject){
    var buf=new Buffer(5);
    i2c1.i2cRead(TEA5767_ADDR, 5, buf, ()=>{
      resolve((buf[3]+0x0f));
    });
  });
}

function getFrequency(){
  return new Promise(function(resolve,reject){
    var buf=new Buffer(5);
    i2c1.i2cRead(TEA5767_ADDR, 5, buf, ()=>{
      let frequency = ((buf[0] & 0x3F) << 8) + buf[1];
      let cfreq=(frequency * 32768 / 4 - 225000) / 1000000;
      resolve(cfreq);
    });
  });
}
