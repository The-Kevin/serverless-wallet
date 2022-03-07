import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel } from '../../src/database/mongoose';
import TransactionModel from '../../src/modules/transactions/models/Transactions';

export const optionsMongoose = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

export const accessToken = (_id?: string) => {
  const JWT_AUDIENCE = '';
  const JWT_ISSUER = '';
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION = 4 * 60 * 60;

  return `Bearer ${jwt.sign(
    {
      _id: _id ?? uuidv4(),
    },
    JWT_SECRET,
    {
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER,
      expiresIn: JWT_EXPIRATION,
    },
  )}`;
};

export const mongoServerInit = () => {
  let mongoServer;

  beforeAll(async (done) => {
    mongoServer = new MongoMemoryServer();

    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, optionsMongoose);
    done();
  });

  afterAll(async (done) => {
    await mongoServer.stop();
    mongoose.connection.close();
    done();
  });
};

export const createFakeUser = async (email) => {
  try {
    const fakeUser = await UserModel.create({
      first_name: 'test',
      last_name: 'admin',
      email,
      password: 'admin123',
    });
    console.log(fakeUser);
    return fakeUser;
  } catch (error) {
    console.log(error.message);
  }
};
export const createFakeTransaction = async ({
  sender_id,
  receiver_id,
  type = 'credit',
  amount = 10,
}) => {
  try {
    const fakerTransaction = await TransactionModel.create({
      user_id: sender_id,
      receiver_id: receiver_id,
      type,
      amount,
    });

    return fakerTransaction;
  } catch (error) {
    console.log(error.message);
  }
};
