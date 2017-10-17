var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/test', function(request, response) {
    var result = 'App is running'
    response.send(result);
});
app.post('/webhook', function(request, response) {
    var result = 'App is running'
    response.send(result);
});
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
