// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// import User from '@models/user';
// import { connectToDB } from '@utils/database';

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         })
//     ],

//     callbacks: {
//         async session({ session }) {
//             const sessionUser = await User.findOne({ email: session.user.email });

//             session.user.id = sessionUser._id.toString();
            
//             return session;
//         },
//         async signIn({ profile }) {
//             try {
//                 await connectToDB();

//                 // check if a user already exists
//                 const userExists = await User.findOne({ email: profile.email });

//                 // if not, create a new user
//                 if(!userExists) {
//                     await User.create({
//                         email: profile.email,
//                         username: profile.name.replace(" ", "").toLowerCase(),
//                         image: profile.picture
//                     })
//                 }
//                 return true;
//             } catch (error) {
//                 console.log(error);
//                 return false;
//             }
//         }
//     }
    
// });

// export { handler as GET, handler as POST };

// CODIGO ACIMA USA A AUTENTICACAO DO GOOGLE

import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions ={
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectToDB();
                    const user = await User.findOne( { email } );

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }
                    
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    // callbacks: {
    //     async session({ session }) {
    //         const sessionUser = await User.findOne({ email: session.user.email });

    //         session.user.id = sessionUser._id.toString();
            
    //         return session;
    //     },
    //     async signIn({mode}, { profile }) {
    //         try {
    //             await connectToDB();
    //             // check if a user already exists
    //             const userExists = await User.findOne({ email: profile.email });

    //             // if not, create a new user
    //             if(!userExists) {
    //                 await User.create({
    //                     email: profile.email,
    //                     username: profile.name, //.replace(" ", "").toLowerCase(),
    //                     phoneNumber: profile.phoneNumber
    //                 })
    //             }
    //             return true;
    //         } catch (error) {
    //             console.log(error);
    //             return false;
    //         }
    //     }
    // },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}