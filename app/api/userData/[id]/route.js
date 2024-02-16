import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB(); // Garanta a conexão com o banco de dados antes de realizar operações
        const id = params.id;

        const user = await User.findOne({ id }).select("_id name phoneNumber");

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.error(error); // É uma boa prática logar o erro
        return new Response("An error occurred while fetching data.", { status: 500 })
    }
};
