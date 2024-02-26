import { connectToDB } from "@utils/database";
import Ticket from "@models/ticket";

export const POST = async (request, { params }) => {
    try {
        await connectToDB();
        const { reason } = await request.json();

        const ticket = await Ticket.findByIdAndUpdate(params.id, { status: reason }, { new: true });

        if (!ticket) {
            return new Response(JSON.stringify({ error: "Ticket not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Ticket status updated successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update ticket status" }), { status: 500 });
    }
}


