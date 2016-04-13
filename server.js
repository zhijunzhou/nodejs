var express = require("express");
var app = express();

app.set('port', process.env.PORT || 3000);

app.get("/", function (req, res) {
    res.type('text/plain');
    res.send('Server started!');
})

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
})

app.use(function (err, req, res, next) {
    console.log(err,stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
})

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port')
    +'; press Ctrl+C to terminate.');
})



// app.post("/", function(req, res) {
//     res.send("Hello Post");
// })

// app.get("/del_user", function (req, res) {
//     res.send("delete page");
// })

// var server = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("%s%s", host,port);
// })