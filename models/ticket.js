import { Schema, model, models } from 'mongoose';

const TicketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;