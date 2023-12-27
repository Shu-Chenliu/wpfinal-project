import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getUserProfile,getMyCoupon} from "./components/actions"
import Coupon from "./components/Coupon";
import { Ghost } from 'lucide-react';
async function HomePage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session?.user?.id;
  const userProfile=await getUserProfile(userDisplayId);
  const userId=session.user.id;
  const coupons=await getMyCoupon(userId);
  return (
    <div className="block h-[90vh] w-full p-3">
      {/* <div className="flex flex-col items-center justify-center">
        <BiError className="text-orange-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a document to edit
        </p>
      </div> */}
      <h1 className="text-2xl font-semibold text-slate-700">
          My Account
        </h1>
      <div className="flex items-center justify-top">
        
        <div>
          {/* <img
            // src={userProfile?.avatar}
            // alt="avatar"
            className="w-40 h-40  border-2 my-2 my-2 "
            
          /> */}
          <Ghost className="w-40 h-40" />
        </div>
        <div className="my-2 my-2 p-3">
          <p>Username: {userProfile?.username}</p>
          <p>User email: {userProfile?.email}</p>
        </div>
        
        
      </div>
      <br />
      <br />
      <div>
         <p className="text-lg font-semibold text-slate-700">My Coupon</p>
        {coupons.map((coupon) =>(
          <div key={coupon.id}>
            <Coupon percent={coupon.percent}/>
          </div>
        ))}
      </div>

    </div>
  );
}
export default HomePage;