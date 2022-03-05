import mongoose from 'mongoose';
import chalk from 'chalk';

const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const termination = chalk.bold.magenta;

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  // ssl: true,
};

const { DB_URL } = process.env;
const connect = (): void => {
  mongoose.connect(DB_URL, options);

  mongoose.connection.on('connected', function (): void {
    console.log(connected('Mongoose default connection is open to', DB_URL));
  });
  mongoose.connection.on('error', function (err): void {
    console.log(error(`Mongoose default connection has occured ${err} error`));
  });
  mongoose.connection.on('disconnected', function (): void {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });
  process.on('SIGINT', function (): void {
    mongoose.connection.close(function () {
      console.log(
        termination('Mongoose default connection is disconnected due to application termination'),
      );
      process.exit(0);
    });
  });
};

export default connect;
