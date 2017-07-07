var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
});



// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
//var bot = new builder.UniversalBot(connector, function (session) {
//    session.send("You said: %s", session.message.text);
//});



var bot = new builder.UniversalBot(connector);
bot.dialog('/', [
    function (session) {
        session.beginDialog('/askName');

    },
    function(session, results){
        session.send('Hello %s!', results.response);

    }
]);

bot.dialog('/askName', [
    function(session){
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function(session,results){
        session.endDialogWithResult(results);
    }
]);
