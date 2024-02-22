import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB(); // Garante a conexão com o banco de dados antes de realizar operações
        const { email, name, phoneNumber } = await request.json();
        
        // Localiza o usuário pelo email
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        // Atualiza o usuário com o nome e o número de telefone
        existingUser.name = name;
        existingUser.phoneNumber = phoneNumber;

        // Salva as atualizações no usuário
        const updatedUser = await existingUser.save();

        return new Response(JSON.stringify({ message: "User updated successfully", user: updatedUser }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error); // É uma boa prática logar o erro
        return new Response(JSON.stringify({ message: "An error occurred while updating the user." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
