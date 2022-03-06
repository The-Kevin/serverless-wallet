import { Request, Response, NextFunction } from 'express';
import TransactionModel from '../transactions/models/Transactions';
import { UserModel } from '../../database/mongoose';
import { TokenData } from 'utils/passport-helper';
import mongoose from 'mongoose';

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const myUser = await UserModel.findById((req.user as TokenData)._id);

    const balance = await TransactionModel.aggregate([
      {
        $match: {
          $expr: {
            $or: [
              {
                receiver_id: mongoose.Types.ObjectId(myUser._id),
              },
              {
                user_id: mongoose.Types.ObjectId(myUser._id),
              },
            ],
          },
        },
      },
      {
        $project: {
          sendTransactions: {
            $cond: {
              if: {
                $eq: ['$user_id', mongoose.Types.ObjectId(myUser._id)],
              },
              then: '$$REMOVE',
              else: '$amount',
            },
          },
          receivedTransactions: {
            $cond: {
              if: {
                $eq: ['$receiver_id', mongoose.Types.ObjectId(myUser._id)],
              },
              then: '$$REMOVE',
              else: '$amount',
            },
          },
        },
      },
      {
        $group: {
          _id: 'totalTransaction',
          totalReceived: {
            $sum: '$receivedTransactions',
          },
          totalSended: {
            $sum: '$sendTransactions',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: {
            $subtract: ['$totalReceived', '$totalSended'],
          },
        },
      },
    ]);

    return res.status(200).json(balance);
  } catch (error) {
    return next(new Error(error.message));
  }
};
