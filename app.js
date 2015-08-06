var fs =require('fs');
var xml = require('xml');

console.log('started');

fs.readFile('./swagger/swagger.json', function(err,data) { 
  if(err) {console.log(err);}
  
  var json = JSON.parse(data);
  console.log(json);
  
  console.log(json.paths);
  
  var pathXml;
  
  for(path in json.paths) {
    //pathXml += xml([{Flow:[{_attr:{name:path.get.x-apigee-flow-name}}]}]);
    var method = json.paths[path].get;
    var name = method[0];
    console.log(name);
  }
  
  //console.log(pathXml);
  
  var test =  xml([ { ProxyEndpoint:[ {Description:json.info.description},{PreFlow : [{_attr:{name:'PreFlow'}}]}, {PostFlow : [{_attr:{name:'PostFlow'}}]} ]}], { declaration: true });
  console.log(test);
  
});