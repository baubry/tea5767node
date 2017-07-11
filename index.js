var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

var TEA5767_ADDR = 0x60
let freq=97.4;

getChipId().then((id)=>{
  console.log("Chip Id: "+id);
});

getFrequency().then((freq)=>{
  console.log("Frequency: "+freq);
});

writeFrequency(freq);

while(true){
  
}

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

function writeFrequency(freq){
  let data=Buffer.alloc(0);
   let i=false;
   let attempt = 0;
   let mute=0;
   let direction=1;
   let freq14bit = Math.round(4 * (freq * 1000000 + 225000) / cof);
   let freqH = freq14bit >>8;
   let freqL = freq14bit & 0xFF;

  let init = freqH&0x3F;

   data[0] = freqL;
   if(mute==0 && direction==1){
    data[1] = 0b10010000;
   }
   else if(mute==0 && direction==0){
         data[1] = 0b00010000;
   }
   else{
      data[1] = 0b00011110;
   }
     
   if(mute==0){
    data[2] = 0b00010000;
   }
   else{
    data[2] = 0b00011111;
   }
   data[3] =  0b00000000;

   while (i==false){
     try {
       i2c1.i2cWriteSync(TEA5767_ADDR,5,buf);
       i = true;
     } catch (error) {
        i = false
       attempt +=1
       if(attempt > 100000){
          break;
       }
     }
   }
}
