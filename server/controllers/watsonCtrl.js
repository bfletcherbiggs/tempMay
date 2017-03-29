const watsonDeveloperCloud = require('watson-developer-cloud')

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: 'd24db3d0-4b52-456b-92f5-4edf247559a3', // replace with username from service key
  password: 'F65So6MdGw58', // replace with password from service key
  path: { workspace_id: '4454b870-3776-4619-b49b-fb88916adf36' }, //4454b870-3776-4619-b49b-fb88916adf36 replace with workspace ID
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
