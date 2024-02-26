import { connectToDB } from "@utils/database";
import Ticket from "@models/ticket";

export const POST = async (request, { params }) => {
    try {
        await connectToDB();
        const { newPrice } = await request.json();

        const ticket = await Ticket.findByIdAndUpdate(params.id, { price: newPrice }, { new: true });

        if (!ticket) {
            return new Response(JSON.stringify({ error: "Ticket not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Ticket price updated successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update ticket price" }), { status: 500 });
    }
}


