import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connectToDB();
        const { name } = await request.json();
        const user = await User.findOne({ name }).select("_id");
        console.log("user: ", user);

        
        // return new Response(JSON.stringify(user));
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
} 