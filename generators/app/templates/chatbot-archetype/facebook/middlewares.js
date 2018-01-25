var dialogflowToFbMiddleware = require('dialogflow-to-facebook-middleware')({});
var debug = require('debug')('<%= appName %>:facebook-bot-middlewares');

//Middlewares are executed in the order they appear
module.exports = function (controller) {

    debug('Loading middlewares...');

    /*
        RECEIVE MIDDLEWARES
    */

    // Log every message received
    controller.middleware.receive.use(function (bot, message, next) {
        debug('Message received')
        debug(message);
        message.logged = true;
        next();
    });

    <% if (nlpService === "DIALOGFLOW"){ %>
    //Init NLP module (dialogflow)
    debug('Configuring dialogflow middleware');
    var dialogflowMiddleware = require('botkit-middleware-dialogflow')({
        token: process.env.DIALOGFLOW_CLIENT_TOKEN
    });
    //Analyze with DialogFlow every message received
    controller.middleware.receive.use(dialogflowMiddleware.receive);
    <% } %>

    <% if (webhook){ %>
    //Every intent annotated with an 'action' will
    //be sent as Webhook
    var webHooks = require('../fulfillment/webhook-fulfillment-middleware')(
        {
            url: process.env.FULFILLMENT_ENDPOINT
        }
    );
    controller.middleware.receive.use(webHooks.receive);
    <% } %>

    <% if(facebookBot && nlpService === "DIALOGFLOW"){ %>
    //Every Facebook reply defined in DialogFlow 
    //ready to send to Facebook
    debug('Configuring dialogflow-to-facebook middleware');
    controller.middleware.receive.use(dialogflowToFbMiddleware.receive);
    <% } %>

    /*
        SEND MIDDLEWARES
    */

    // Log every message sent
    controller.middleware.send.use(function (bot, message, next) {
        debug('Message sent')
        debug(message);
        message.logged = true;
        next();
    });
}