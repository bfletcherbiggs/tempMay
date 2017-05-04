const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors')
// First time we have to import passport.js, not the module, so that we can change the default code
const passport = require('./server/passport')

const watsonRouter = require('./server/routes/watsonRouter.js')
const userWillRouter = require('./server/routes/userWillRouter.js')
const userLoginRouter = require('./server/routes/userLoginRouter.js')
const app = express();
const port = 3000;


app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(cors())
app.use(session({ secret: 'the Goat' }));

app.use(passport.initialize());
app.use(passport.session())

app.use('/watson', watsonRouter)
app.use('/api/user/will', userWillRouter)
app.use('/api/user/login', userLoginRouter)

app.listen(3000)
