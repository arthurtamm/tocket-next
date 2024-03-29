import RegisterForm from "@components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const Register = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return (
    <div className='bg-white'>
        <RegisterForm/>
    </div>
  )
}

export default Register;