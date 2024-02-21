import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB(); // Garanta a conexão com o banco de dados antes de realizar operações
        const { id, name, phoneNumber } = await request.json();
        
        // Localiza o usuário pelo email e atualiza o nome e o número de telefone
        const updatedUser = await User.findOneAndUpdate(
            { _id : id}, // critério de busca
            { name : name, phoneNumber : phoneNumber }, // campos para atualizar
            { new: true, runValidators: true } // opções para retornar o documento atualizado e executar validações
        );

        if (!updatedUser) {
            return new Response("User not found", { status: 404 });
        }

        return new Response("User updated successfully", { status: 200 });
    } catch (error) {
        console.error(error); // É uma boa prática logar o erro
        return new Response("An error occurred while updating the user.", { status: 500 })
    }
};
