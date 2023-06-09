/**********************************/
/* Set up the static file server */
let static = require('node-static');

/*Set up the http server library*/
let http = require('http');

/* Assume that we are running on cyclic (not heroku) */
let port = process.env.PORT;
let directory = __dirname + '/public'

/*Not on hiroku */
if ((typeof port == 'undefined') || (port === null)){
    port = 8080;
    directory = './public';
}

/* Set up our static file web server to deliver files from the filesystem */
let file = new static.Server(directory);

let app = http.createServer(
    function(request, response){
        request.addListener( 'end' ,
            function(){
                file.serve(request,response);
            }
        ).resume()
    }
).listen(port);

console.log('The server is running');