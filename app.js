var fs =require('fs');
var xml = require('xml');
var yamljs = require('yamljs')


//ProxyEndpoint name attr
//Request and Response for all flows
//Description for ProxyEndpoint and for all custom flows
//Condition node for custom flows - use path and verb (other conditions?) 
//routerules
//faultrules (policies?)
//targetendpoint
//files to correct directories
//policy support
//tests
//grunt
//api
//yaml implementation

console.log('started');

fs.readFile('./swagger/swagger.json', function(err,data) { 
  if(err) {console.log(err);}
  
  var json = JSON.parse(data);
  //console.log(json);
  
  //console.log(json.paths);
  
  var pathXml;
  
  var proxy = [ { ProxyEndpoint:[{_attr:{name:json.info['title']}}, {Description:json.info.description},{PreFlow : [{_attr:{name:'PreFlow'}}]}]}];
  
  for(path in json.paths) {
    
    proxy[0]["ProxyEndpoint"].push({Flow:[{_attr:{name:json.paths[path]["get"]["x-apigee-flow-name"]}}]});
    
    pathXml += xml([{Flow:[{_attr:{name:json.paths[path]["get"]["x-apigee-flow-name"]}}]}]);
    var method = json.paths[path];
    
    
    //console.log(method["get"]['x-apigee-flow-name']);
  }
  
  var postflow = {PostFlow : [{_attr:{name:'PostFlow'}}]};
  proxy[0]["ProxyEndpoint"].push(postflow);
  
  var proxyConnection = {HTTPProxyConnection: [{BasePath: json.basePath}]};
  var schemes =json.schemes;
  console.log(json.schemes);
 
  console.log(proxyConnection['HTTPProxyConnection']);
  
 
  var faultRules = {FaultRules:''};
  proxy[0]["ProxyEndpoint"].push(faultRules);
  
 
  for(var i=0; i< schemes.length; i++) {
    console.log(schemes[i]);
    if(schemes[i]=='http') {
      proxyConnection['HTTPProxyConnection'].push({VirtualHost:'default'});
      
    }
    else if(schemes[i]=='https') {
      proxyConnection['HTTPProxyConnection'].push({VirtualHost:'secure'});
      
      
    }
  }
 
  proxy[0]["ProxyEndpoint"].push(proxyConnection);
  
  var routeRules = {RouteRules:''};
  proxy[0]["ProxyEndpoint"].push(routeRules);
  
  console.log(xml(proxy,{ declaration: true }));
  
  var test =  xml([ { ProxyEndpoint:[ {Description:json.info.description},{PreFlow : [{_attr:{name:'PreFlow'}}]}, {PostFlow : [{_attr:{name:'PostFlow'}}]} ]}], { declaration: true });
 // console.log(test);
  
  /*var yamlJSON = yamljs.load("./yaml/swagger.yaml");
  
  console.log(yamlJSON);
  console.log(yamlJSON['x-apigee-proxy-path']);*/
  
});