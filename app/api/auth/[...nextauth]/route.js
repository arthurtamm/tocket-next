import NextAuth from "next-auth";
import clientPromise from "@utils/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import EmailProvider from "next-auth/providers/email";
import { connectToDB } from "@utils/database";
import User from "@models/user";
// import { MongooseAdapter } from "@next-auth/mongoose-adapter";

const authOptions =  NextAuth({
/* Either use the MongoDB adapter, initiate a
cached MongoDB connection in /lib/mongodb.js
and pass the connection to the adapter
*/
  adapter: MongoDBAdapter( clientPromise ),
  // adapter: MongooseAdapter(process.env.MONGODB_URI),

  /* Or use a self-made adapter such as the mine,
  which only requires you to pass in the connection string

  adapter: MongooseAdapter(process.env.MONGODB_URI),
  */
  providers: [
      EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM
      }),
  ],

  // VERSAO SEM UTILIZAR O MONGOOSE, UTILIZANDO O MONGODB NATIVO
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     const client = await clientPromise;
  //     const db = client.db("tocket"); // Substitua "yourDatabaseName" pelo nome do seu banco de dados
  
  //     // Verifica se o usuário já existe
  //     const existingUser = await db.collection("users").findOne({ email: user.email });
  
  //     if (!existingUser) {
  //       // Cria um novo usuário se não existir
  //       await db.collection("users").insertOne({
  //         name: user.name,
  //         email: user.email,
  //         // Adicione quaisquer outros campos necessários
  //       });
  //     }
  
  //     return true;  // Retorna true para completar o signIn
  //   },
  //   // Outros callbacks conforme necessário...
  // },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectToDB(); // Garante que a conexão com o DB está ativa

      const existingUser = await User.findOne({ email: user.email }).exec();
      
      if (!existingUser) {
        const newUser = new User({
          name: user.name, // || profile.name,
          email: user.email,
          // Outros campos necessários
        });

        try {
          await newUser.save();
        } catch (error) {
          console.error("Erro ao criar o usuário:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      // Se `user` estiver definido, estamos no processo de login ou criação do usuário
      if (user) {
        // Tenta buscar informações adicionais do usuário se disponíveis
        await connectToDB(); // Garante que a conexão com o DB está ativa
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.userId = dbUser._id.toString(); // Adicione o ID do usuário ao token JWT
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Adiciona `name` e `phoneNumber` ao objeto da sessão se eles estiverem presentes no token JWT
      // console.log("editando session: ", session, token)
      if (token.userId) session.user.id = token.userId;
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "light",
  },
  // debug: false,
});

export { authOptions as GET, authOptions as POST };