import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getUserProfile} from "./components/actions"
import Coupon from "./components/Coupon";
async function HomePage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session?.user?.id;
  const userProfile=await getUserProfile(userDisplayId);
  return (
    <div className="block h-[90vh] w-full p-3">
      {/* <div className="flex flex-col items-center justify-center">
        <BiError className="text-orange-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a document to edit
        </p>
      </div> */}
      <h1 className="text-sm font-semibold text-slate-700">
          My Account
        </h1>
      <div className="flex items-center justify-top">
        
        <div>
          <img
            // src={userProfile?.avatar}
            // alt="avatar"
            className="w-40 h-40  border-2 my-2 my-2 "
          />
        </div>
        <div className="my-2 my-2 p-3">
          <p>Username: {userProfile?.username}</p>
          <p>User email: {userProfile?.email}</p>
        </div>
        
        
      </div>
      <div>
         <p className="text-lg font-semibold text-slate-700">My Coupon</p>
        
        <Coupon percent={10}/>
        <Coupon percent={5}/>
        <Coupon percent={20}/>
      </div>

    </div>
  );
}
export default HomePage;