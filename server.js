const express = require('express');
const routes = require('./routes');
const connections = require('./config/connection.js') //added not in starter code

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);



// sync sequelize models to the database, then turn on the server
connections.sync()

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
