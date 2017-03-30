const watsonDeveloperCloud = require('watson-developer-cloud')

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: 'ff770025-998a-4da1-ad39-8ac798a71695', // replace with username from service key
  password: 'GmfK7l4rnVqS', // replace with password from service key
  path: { workspace_id: '00ae8602-e60d-436c-a5d1-f3f76de3a2c1' }, //4454b870-3776-4619-b49b-fb88916adf36 replace with workspace ID
  version_date: '2017-02-03'
});
// Start conversation with empty message.
var context = {};

module.exports = {
  getMessage: function(req, res) {
    console.log("Hit message")
    conversation.message({}, function(err, response) {
      context = response.context;
      if (err) {
        console.error(err); // something went wrong
        return;
      }

      // If an intent was detected, log it out to the console.
      if (response.intents.length > 0) {
        console.log('Detected intent: #' + response.intents[0].intent);
      }

      // Display the output from dialog, if any.
      if (response.output.text.length != 0) {
          console.log(response.output.text[0]);
          res.send(response.output.text[0])
      }

    });
  },

  postMessage: function(req, res, next) {
    console.log(context)
    conversation.message({
    input: { text: req.body.message },
    context : context,
  }, function(err, response) {
        // TODO: Later put context on req.user
        // TODO: Save context to database
        context = response.context;
        if (err) {
          console.error(err); // something went wrong
          return;

        }

        // If an intent was detected, log it out to the console.
        if (response.intents.length > 0) {
          console.log('Detected intent: #' + response.intents[0].intent);
        }
        // Display the output from dialog, if any.
        if (response.output.text.length != 0) {
            console.log(response.output.text[0]);
            return res.send(response.output.text[0])
        }
        return res.send("I didnt quite understand what you said")
      }
    )
  }
}
