import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const event = await Event.findById(params.id);
        if(!event) return new Response("Event not found", { status: 404 });

        return new Response(JSON.stringify(event), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all events", { status: 500 });
    }
} 