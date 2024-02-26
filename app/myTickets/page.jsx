import MyTicketsForm from "@components/MyTicketsForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
        <MyTicketsForm/>
    </div>
  )
}

export default Profile;