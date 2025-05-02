import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'sports' | 'cultural' | 'department' | 'training';
  organizer: Types.ObjectId;
  attendees: Types.ObjectId[];
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['sports', 'cultural', 'department', 'training'],
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Event = mongoose.model<IEvent>('Event', eventSchema); 