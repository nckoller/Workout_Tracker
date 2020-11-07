// requiring packages
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');

// setting up express app and port
const PORT = process.env.PORT || 3000;
const app = express();
// event logger
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// requiring routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);
// setting up DB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ninaDB', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
