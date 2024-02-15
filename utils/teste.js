import { connectToDB } from "@utils/database";
import { User } from "./models/user";

async function teste() {
    await connectToDB();
    console.log("Conectado ao banco de dados");
    const existingUser = await User.findOne({ email: "arthurmt@al.insper.edu.br" }).exec();
    console.log("Usuario encontrado:", existingUser);
}