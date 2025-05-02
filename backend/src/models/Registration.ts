import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IRegistration extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  email: string;
  prn: string;
  division: string;
  year: number;
  department: string;
  createdAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  prn: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  department: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Registration = mongoose.model<IRegistration>('Registration', registrationSchema); 