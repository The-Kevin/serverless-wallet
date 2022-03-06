import mongoose, { Schema } from 'mongoose';
import { config } from 'dotenv';
config();
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const { DB_URL, USER_DB } = process.env;

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

const connections = {
  connecton1: mongoose.createConnection(),
};

const userDb =
  process.env.NODE_ENV !== 'test' ? mongoose.createConnection(USER_DB) : connections.connecton1;

export interface IUser {
  _id: string;
  email: string;
}
const UserModel = userDb.model<IUser>(
  'User',
  new Schema({
    email: {},
  }),
);

export { UserModel };
export default connect;
