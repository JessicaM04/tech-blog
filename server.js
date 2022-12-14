const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const routes = require("./controllers");
const session = require('express-session');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const handlebars = expressHandlebars.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});