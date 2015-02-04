var fs = require('fs'),
    path = require('path'),
    URL = require('url'),
    Mime = require('mime'),
    restify = require('restify'),
    cookieParser = require('restify-cookies'),
    httpProxy = require('http-proxy'),
    tokenValidator = require('./test/restify/tokenValidator');

"use strict"

//get the application root path
function getRootPath(roots) {
    roots = roots || ['.', './application/src'];
    var answer = roots.filter(function(rootPath) { 
    console.log('Possible rootPath: ' + rootPath);
    console.log('Possible rootPath/../../config.json: ' + path.resolve(rootPath + '/../../config.json'));
    return fs.existsSync(path.resolve(rootPath + '/../../config.json')) })[0];
    return answer;
}

//Handles requests not supported by restify (i.e. main page requests, image requests, etc)
function handleExternalRequests(request, response, callBack, options, proxy) {
    //They proxy out calls including intergration server, preserved for future support of content calls bundled into app
    if (request.url.indexOf('integrationserver') > -1) {
            if (!options.useCustomConnection) {
                try {
                    proxy.web(request,response, {target: options.integrationServer});
                    }
                catch(e) {
                    //do nothing for now
                }
            }
            else {
                response.writeHead(200, {"Content-Type": 'text/html'});
                response.end();
            }
    }
    else { //We are not a request for integration server... go back up to app directory and service request
        try {
            console.log(options.root+ '/../../'+request.url);
            var path = URL.parse(options.root+ '/../../'+request.url).pathname;
            if (path.match(/^\..*\/$/)) path += 'index.html';
            var mimeType = Mime.lookup(path);
            var responseBody = fs.readFileSync(path);
            response.writeHead(200, {'Content-Type': mimeType});
            response.end(responseBody); 
        }
        catch (exception){  //invalid request
            response.writeHead(404, {"Content-Type": 'text/html'});
            response.end("<h1>Not a valid address</h1>" + exception.toString());
        }
    }
}

function CreateServer(options) {
    //only use one proxy per app run
    var proxy = httpProxy.createServer({we: true});
    console.log('root: ' + options.root);
    
    //load our restify endpoint module
    var restifyModulePath = options.root + '/test/restify/rest.js';
    restifyModulePath = path.resolve(restifyModulePath);
    console.log(restifyModulePath);
    var restifyEndPoint = require(restifyModulePath);
    
    //create server
    var restServer = restify.createServer();
    restServer.use(restify.bodyParser());
    restServer.use(restify.authorizationParser());
    restServer.use(cookieParser.parse);
    restServer.use(restify.queryParser());
    restServer.use(tokenValidator.validateRequestToken);
    restifyEndPoint.initEndpoint(restServer);
    restServer.on('NotFound', function(request,response,cb) { handleExternalRequests(request,response,cb,options, proxy);} );
    restServer.listen(options.port);
    console.log('Server started at http://localhost:' + options.port + '  Press Ctrl + C to close server.');
    
    //handle exceptions and app close
    process.on('uncaughtException', function(err){
        if (err.errno === 'EACCES' || err.errno === 'EADDRINUSE') console.log('There is already a service running on port ' + options.port + '. Stop that service or add -p parameter to change the port used.');
        console.log('Server shut down.');
    });
    process.on('SIGINT', function(){
        if (options.modifiedFiles){
            for (var x in options.modifiedFiles) {
                var item = options.modifiedFiles[x];
                if (item === 'delete') {
                    fs.unlinkSync(x);
                }
                else {
                    fs.writeFileSync(x, item);
                }
            }
        }
        console.log('Server shut down.');
        process.exit();
    });
}

//Export module run function
module.export = {
 run: function(options) {
        var serverOptions = {
            useCustomConnection: true,
            port: options.port || 9000,
            root: getRootPath()
        };

        if (!serverOptions.root) {
            console.error('This command should be run from a project root folder');
            return;
        }

        CreateServer(serverOptions);
    },
};

//run module, slicing arguments into arrays
module.export.run(process.argv.slice(2));