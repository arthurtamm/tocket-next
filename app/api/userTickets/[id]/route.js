import Ticket from "@models/ticket";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const tickets = await Ticket.find({ user: params.id, status: 'active' }).populate('user').populate('event');
        if(!tickets) return new Response("Tickets not found", { status: 404 });
        
        return new Response(JSON.stringify(tickets), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all user tickets", { status: 500 });
    }
}