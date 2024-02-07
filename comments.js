// Create web server
// Load the module
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

// Create web server
var server = http.createServer(function (request, response) {
    // Get the URL from the request
    var parsedUrl = url.parse(request.url, true);
    var path = parsedUrl.pathname;
    // Get the query string from the URL
    var query = parsedUrl.query;
    // Get the method from the request
    var method = request.method;

    if (path === '/comments' && method === 'GET') {
        // Return the list of comments as JSON
        var commentString = JSON.stringify(comments);
        response.end(commentString);
    } else if (path === '/comments' && method === 'POST') {
        // Add a new comment to the list
        var body = [];
        request.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            var newComment = JSON.parse(body);
            comments.push(newComment);
            response.end('Comment added');
        });
    } else {
        // Return an error message
        response.statusCode = 404;
        response.end('Not found');
    }
});

// Start the server
server.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
//