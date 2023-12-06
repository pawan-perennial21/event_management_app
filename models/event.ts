import mongoose, { Schema, Document } from "mongoose";

interface IEVENT extends Document {
    title: string;
    description: string;
    location: string;
    date: Date;
    time: any;
    registered: Boolean;
    // user: Schema.Types.ObjectId; // Reference to User
}

const eventSchema = new Schema<IEVENT>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: false },
    time: { type: Date, required: false },
    registered: { type: Boolean, required: true },
});

const Event =
    mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
