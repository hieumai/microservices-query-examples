import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import errorhandler from 'errorhandler';
import mongoose from 'mongoose';
import { Seeder } from 'mongo-seeding';

const isProduction = process.env.NODE_ENV === 'production';

const databaseName = 'kitchen'
const databaseConfig = {
  database: `mongodb://localhost:27017/${databaseName}`,
  dropDatabase: true,
};

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: databaseName, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseConfig.database);
  mongoose.set('debug', true);
}

import './models';
import routes from './routes';
import { SERVICE_LOCAL_PORT } from '../constants';

const seeder = new Seeder(databaseConfig);
const seedDataCollections = seeder.readCollectionsFromPath(path.resolve("./seed-data"));

seeder.import(seedDataCollections)
  .then(() => {
    console.log('Seed data done');
  })
  .catch(err => {
    console.log('Seed data error:', err);
  });

app.use(routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
const server = app.listen( process.env.PORT || SERVICE_LOCAL_PORT.kitchen, function() {
  console.log('Listening on port ' + server.address().port);
});
