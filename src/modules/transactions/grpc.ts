import TransactionModel from './models/Transactions';
import { UserModel } from '../../database/mongoose';

module.exports = {
  async createTransaction(call, callback) {
    const { _id, receiver_id, type, amount } = call.request;

    const newTransaction = new TransactionModel({
      user_id: _id,
      receiver_id,
      type,
      amount,
    });
    await newTransaction.save();
    const populate = await UserModel.populate(newTransaction, [
      {
        path: 'user_id',
        select: '_id email first_name last_name',
      },
      {
        path: 'receiver_id',
        select: '_id email first_name last_name',
      },
    ]);

    return callback(null, populate);
  },
  async listTransaction(call, callback) {
    const { _id, page = 0, limit = 15 } = call.request;

    const findOptions = {
      user_id: _id,
    };

    const transactions = await TransactionModel.find(findOptions)
      .skip(page * limit)
      .limit(limit);

    const populate = await UserModel.populate(transactions, {
      path: 'user_id',
      select: '_id email first_name last_name',
    });
    return callback(null, populate);
  },
};
