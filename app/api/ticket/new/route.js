import { connectToDB } from "@utils/database";
import Ticket from "@models/ticket";    

export const POST = async (req) => {
    const { userId, event, price } = await req.json();

    try {
        await connectToDB();
        const newTicket = new Ticket({
            user: userId,
            event,
            price
        })

        await newTicket.save();

        return new Response(JSON.stringify(newTicket), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new ticket", { status: 500 })
    }
}