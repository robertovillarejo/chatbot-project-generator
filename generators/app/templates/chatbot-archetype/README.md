# <%= appName %>

<%= description %>

## Usage
Once all variables defined, run `npm install` and dependencies will be downloaded.

If you want to create a basic conversation for your DialogFlow agent, run `npm run conversation-create`.

Finally, to run the project simply execute `npm start` or `node index.js`.

## Chatting with the chatbot
Once your project is running, make sure your ip is public. Then, in your Facebook App, add a webhook with that ip and the verify token you defined in the `.env` file.

Go to your Facebook page and send a message to start the conversation. 
