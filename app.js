var fs =require('fs');

console.log('started');

fs.readFile('./swagger/swagger.json', function(err,data) { 
  if(err) {console.log(err);}
  
  var json = JSON.parse(data);
  console.log(json);
  
});