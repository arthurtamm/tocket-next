import { Schema, model, models } from 'mongoose';

const TicketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.'],
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    type: {
        type: String,
        required: [true, 'Type is required.'],
    },
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;