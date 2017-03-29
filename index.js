const express = require('express');
const bodyParser = require('body-parser');
const watsonRouter = require('./server/routes/watsonRouter.js')
const userWillRouter = require('./server/routes/userWillRouter.js')

const app = express();
const port = 3000;

app.use(express.static("./public"))
app.use(bodyParser.json());

app.use('/watson', watsonRouter)
app.use('/api/user/will', userWillRouter)

app.listen(3000)
