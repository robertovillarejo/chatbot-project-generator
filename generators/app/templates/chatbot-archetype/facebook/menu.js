module.exports = function (controller) {
    <% if(facebookBot && facebookBotConfig.menu){ %>
    controller.api.messenger_profile.greeting('!Hola! Soy el chatbot de <%= appName %>');
    controller.api.messenger_profile.get_started('Hola');
    controller.api.messenger_profile.menu([{
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
            {
                "title": "Menú",
                "type": "nested",
                "call_to_actions": [
                    {
                        "title": "Información general",
                        "type": "postback",
                        "payload": "Información general"
                    },
                    {
                        "title": "Hablar con un humano",
                        "type": "postback",
                        "payload": "Hablar con un humano"
                    },
                    {
                        "title": "Creadores del chatbot",
                        "type": "postback",
                        "payload": "¿Quienes son tus creadores?"
                    }
                ]
            }
            <% if (appPage !== ""){ %>
            ,{
                "type": "web_url",
                "title": "<%= appName %>",
                "url": "<%= appPage %>",
                "webview_height_ratio": "full"
            }
            <% } %>
        ]
    }
    ]);
    <% } %>
}
