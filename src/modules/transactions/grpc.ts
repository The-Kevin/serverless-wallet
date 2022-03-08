import TransactionModel from './models/Transactions';

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
    return callback(null, { newTransaction });
  },
  async listTransaction(call, callback) {
    const { _id } = call.request;

    const findOptions = {
      user_id: _id,
    };

    const transactions = await TransactionModel.find(findOptions);

    return callback(null, { transactions });
  },
};
