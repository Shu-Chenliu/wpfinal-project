import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getUserProfile,getMyCoupon} from "./components/actions"
import Coupon from "./components/Coupon";
import { Ghost , Store } from 'lucide-react';
import { useState } from "react";
import EditProfile from "./components/EditProfile";
import AddImageButton from "./components/AddImageButton";
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
      
      <h1 className="text-2xl font-semibold text-slate-700">
          My Profile
      </h1>
      <br />
      <div className="flex items-center justify-top">
        
      <div>
          {/* <img
            src={userProfile?.imageURL!}
            className="w-40 h-40  border-2 my-2 my-2 "           
          />
          <Ghost className="w-40 h-40" /> */}

          {userProfile?.imageURL ?(
            <div className="flex">
              <img
                src={userProfile?.imageURL!}
                className="w-40 h-40  border-2 my-2 my-2 "           
              />
            </div>
          ):(
            <><Ghost className="w-40 h-40" /></>
          )}



          <AddImageButton userId={userId}/>
        </div>
        {/* <div className="my-2 my-2 p-3">
          <p>Username: {userProfile?.username}</p>
          <p>User email: {userProfile?.email}</p>
        </div> */}
        <EditProfile
          variant="edit"
          status="personal"
          title={userProfile?.username}
          description={userProfile?.email}
        />
      </div>
      <br/><br/>
      <div>
         <p className="text-lg font-semibold text-slate-700">My Coupon</p>
        {coupons.map((coupon) =>(
          <div key={coupon.id}>
            <Coupon percent={coupon.percent}/>
          </div>
        ))}
      </div>  

      <br/><br/>
      
      <div className="block items-center justify-top">
        <p className="text-xl font-semibold text-slate-700">My Market</p>
        <div className="flex">
          <Store className="w-40 h-40" />
          <EditProfile
              variant="edit"
              status="market"
              // marketName={userProfile?.marketName}
              // marketDescription={userProfile?.marketDescription}
              // marketAddress={userProfile?.marketAddress}
              // marketMessage={userProfile?.marketMessage}

            />
        </div>     
      </div>

    </div>
  );
}
export default HomePage;