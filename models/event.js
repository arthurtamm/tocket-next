import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    
    image: {
        type: String,
        required: [true, 'Image is required.'],
    },
    
    date: {
        type: Schema.Types.Date,
        required: [true, 'Date is required.'],
    },

    place: {
        type: String,
        required: [true, 'Place is required.'],
    },

    ticketTypes: {
        type: [String],
        required: [true, 'Ticket types are required.'],
    },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;