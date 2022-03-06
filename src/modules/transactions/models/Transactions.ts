import mongoose, { Schema, Document } from 'mongoose';
import { UserModel } from '../../../database/mongoose';
export enum TypeTransaction {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface Transaction extends Document {
  user_id: string;
  receiver_id: string;
  type: string;
  amount: string;
}

const transactionSchema: Schema<Transaction> = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: TypeTransaction.CREDIT,
      enum: Object.values(TypeTransaction),
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Transaction>('Transaction', transactionSchema);
