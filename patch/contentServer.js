const connect = require('connect');
const serveStatic = require('serve-static');
const contentDirectory = './Patchs/';

connect().use(serveStatic(contentDirectory)).listen(80, function(){
    console.log('Content Server successfully started on port 80');
});