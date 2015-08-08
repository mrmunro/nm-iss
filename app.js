var fs =require('fs');
var xml = require('xml');
var yamljs = require('yamljs')



console.log('started');

fs.readFile('./swagger/swagger.json', function(err,data) { 
  if(err) {console.log(err);}
  
  var json = JSON.parse(data);
  //console.log(json);
  
  //console.log(json.paths);
  
  var pathXml;
  
  var proxy = [ { ProxyEndpoint:[ {Description:json.info.description},{PreFlow : [{_attr:{name:'PreFlow'}}]}]}];
  
  for(path in json.paths) {
    
    proxy[0]["ProxyEndpoint"].push({Flow:[{_attr:{name:json.paths[path]["get"]["x-apigee-flow-name"]}}]});
    
    pathXml += xml([{Flow:[{_attr:{name:json.paths[path]["get"]["x-apigee-flow-name"]}}]}]);
    var method = json.paths[path];
    
    
    //console.log(method["get"]['x-apigee-flow-name']);
  }
  
  var postflow = {PostFlow : [{_attr:{name:'PostFlow'}}]};
  proxy[0]["ProxyEndpoint"].push(postflow);
  
  console.log(xml(proxy,{ declaration: true }));
  
  var test =  xml([ { ProxyEndpoint:[ {Description:json.info.description},{PreFlow : [{_attr:{name:'PreFlow'}}]}, {PostFlow : [{_attr:{name:'PostFlow'}}]} ]}], { declaration: true });
 // console.log(test);
  
  /*var yamlJSON = yamljs.load("./yaml/swagger.yaml");
  
  console.log(yamlJSON);
  console.log(yamlJSON['x-apigee-proxy-path']);*/
  
});