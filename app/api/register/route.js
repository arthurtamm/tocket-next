import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectToDB();
        await User.create({ name, email, password: hashedPassword });
        
        return new Response("User registered successfully", { status: 201 });
    } catch (error) {
        return new Response("An error curred while registering the user.", { status: 500 })
    }
} 