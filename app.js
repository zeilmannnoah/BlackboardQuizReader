const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.use(fileUpload());
app.use(bodyParser.json());

app.use('/', require("./routes/index"));
app.use('/upload', require("./routes/upload"));
app.use('/takeQuiz', require("./routes/takeQuiz"));
app.use('/resources', express.static('resources'));

app.listen(port, console.log(`listening on port ${port}`));