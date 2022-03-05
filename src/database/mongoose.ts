import mongoose, { Schema } from 'mongoose';
import { config } from 'dotenv';
config();
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const { DB_URL } = process.env;
const connections = {
  connecton1: mongoose.createConnection(),
};

const userDb =
  process.env.NODE_ENV !== 'test'
    ? mongoose.createConnection(process.env.USER_DB)
    : connections.connecton1;

export interface IUser {
  _id: string;
  email: string;
}

export const UserModel = userDb.model<IUser>(
  'User',
  new Schema({
    email: String,
  }),
);

const connect = (): void => {
  mongoose.connect(DB_URL, options);

  mongoose.connection.on('connected', function (): void {
    console.log('Mongoose default connection is open to', DB_URL);
  });
  mongoose.connection.on('error', function (err): void {
    console.log(`Mongoose default connection has occured ${err} error`);
  });
  mongoose.connection.on('disconnected', function (): void {
    console.log('Mongoose default connection is disconnected');
  });
  process.on('SIGINT', function (): void {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection is disconnected due to application termination');
      process.exit(0);
    });
  });
};

export default connect;
