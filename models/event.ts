import mongoose, { Schema, Document } from 'mongoose';

interface IEVENT extends Document {
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string;
  isFeatured: boolean;
}

const eventSchema = new Schema<IEVENT>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: false },
  image: { type: String, required: true },
  isFeatured: { type: Boolean, required: true },
});

const Event = mongoose.model<IEVENT>('Event', eventSchema);

export default Event;
