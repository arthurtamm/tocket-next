import ProfileForm from "@components/ProfileForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-white'>
        <ProfileForm/>
    </div>
  )
}

export default Profile;