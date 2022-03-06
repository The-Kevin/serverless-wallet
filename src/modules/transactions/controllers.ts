import { Request, Response, NextFunction } from 'express';
import TransactionModel from './models/Transactions';
import { UserModel } from '../../database/mongoose';
import { TokenData } from 'utils/passport-helper';

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const myUser = await UserModel.findById((req.user as TokenData)._id);
    const { type, amount } = req.body;

    const newTransaction = new TransactionModel({
      user_id: myUser._id,
      type,
      amount,
    });
    await newTransaction.save();

    const populate = await UserModel.populate(newTransaction, {
      path: 'user_id',
      select: '_id email first_name last_name',
    });

    return res.status(201).json(populate);
  } catch (error) {
    return next(new Error(error.message));
  }
};

export const listTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const myUser = await UserModel.findById((req.user as TokenData)._id);

    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 15;

    let findOptions = {
      user_id: myUser._id,
    };

    if (req.query?.type) {
      findOptions = Object.assign(findOptions, {
        type: req.query.type,
      });
    }
    const transactions = await TransactionModel.find(findOptions)
      .skip(page * limit)
      .limit(limit);

    const populate = await UserModel.populate(transactions, {
      path: 'user_id',
      select: '_id email first_name last_name',
    });
    return res.status(200).json(populate);
  } catch (error) {
    return next(new Error(error.message));
  }
};

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const myUser = await UserModel.findById((req.user as TokenData)._id);
    const balance = await TransactionModel.aggregate([
      {
        $match: {
          _id: myUser._id,
        },
      },
      {
        $group: {
          _id: 'total',
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    return res.status(200).json(...balance);
  } catch (error) {
    return next(new Error(error.message));
  }
};
