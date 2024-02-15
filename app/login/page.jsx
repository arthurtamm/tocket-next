import LoginForm from '@components/LoginForm';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextAuth } from "@app/api/auth/[...nextauth]/route";

const LogIn = async () => {
  const session = await getServerSession(NextAuth);

  if (session) redirect('/');
  return (
    <main>
        <LoginForm/>
    </main>
  )
}

export default LogIn;