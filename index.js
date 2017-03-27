const express = require('express');
const bodyParser = require('body-parser');
const watsonDeveloperCloud = require('watson-developer-cloud')
const app = express();
const port = 3000;
app.use(express.static("./public"))
app.use(bodyParser.json());


var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: 'd24db3d0-4b52-456b-92f5-4edf247559a3', // replace with username from service key
  password: 'F65So6MdGw58', // replace with password from service key
  path: { workspace_id: '4454b870-3776-4619-b49b-fb88916adf36' }, // replace with workspace ID
  version_date: '2017-02-03'
});
// Start conversation with empty message.
var context = {};
app.get('/message', function(req, res) {
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
})

app.post('/message', function(req, res, next) {
  conversation.message({
  input: { text: req.body.message },
  context : context,
}, function(err, response) {
      // TODO: Later put context on req.user
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
      return res.send("Sorry. I didn't get that")
    }
  )
})
app.listen(3000)
