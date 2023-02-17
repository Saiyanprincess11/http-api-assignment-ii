const http = require('http');
const url = require('url'); 
const query = require('querystring')
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000; 


//URL Handling 
const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS, 
    '/getUsers': jsonHandler.getUsers, 
    '/notReal': jsonHandler.notReal, 
    notFound: jsonHandler.notFound, 
  }, 

  'HEAD': {
    '/getUsers': jsonHandler.getUsersMeta, 
    '/notReal': jsonHandler.notRealMeta, 
    notFound: jsonHandler.notFoundMeta, 
  },
}; 

//HTTP Request handling 
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url); 

  //Sends 404 for all non GET/HEAD requests 
  if(!urlStruct[request.method]){
    return urlStruct['HEAD'].notFound(request, response); 
  }

  //Checks for handler 
  if(urlStruct[request.method][parsedUrl.pathname]){
    urlStruct[request.method][parsedUrl.pathname](request, response); 
  } else {//otherwise sends 404 Not Found code 
    urlStruct[request.method].notFound(request, response); 
  }

}; 

//Starts server 
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`); 
}); 