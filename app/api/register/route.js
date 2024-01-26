import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    try {
        const { name, email, password, phoneNumber } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectToDB();
        await User.create({ name, email, password: hashedPassword, phoneNumber });
        
        return new Response("User registered successfully", { status: 201 });
    } catch (error) {
        return new Response("An error ocurred while registering the user.", { status: 500 })
    }
} 