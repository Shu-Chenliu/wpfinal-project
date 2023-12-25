import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getUserProfile} from "./components/actions"
async function HomePage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session?.user?.id;
  const userProfile=await getUserProfile(userDisplayId);
  return (
    <div className="flex h-[90vh] w-full ">
      {/* <div className="flex flex-col items-center justify-center">
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a document to edit
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-top">
        <p className="text-sm font-semibold text-slate-700">
          My Account
        </p>
        <p>{userProfile?.username}</p>
        <p>{userProfile?.email}</p>
        {userProfile?.posts.map((post) =>(
          <div key={post.id}>
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;