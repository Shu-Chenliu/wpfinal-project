import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getUserProfile,getMyCoupon} from "./components/actions"
import Coupon from "./components/Coupon";
import { Ghost , Store } from 'lucide-react';
import EditProfile from "./components/EditProfile";
import AddImageButton from "./components/AddImageButton";
import Link from "next/link";
import Image from "next/image";
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
      
      <h1 className="text-2xl font-semibold text-slate-700 hover:text-slate-500">
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
            <div className="flex w-40 h-40 relative">
              {/* <img
                src={userProfile?.imageURL}
                className="w-40 h-40  border-2 my-2 my-2 "           
              /> */}
              <Image
                src={userProfile?.imageURL}
                alt="user Photo"
                fill={true}
                
              />
            </div>
          ):(
            <><Ghost className="w-40 h-40 hover:text-yellow-500" /></>
          )}



          <AddImageButton userId={userId} status="market"/>
        </div>
        {/* <div className="my-2 my-2 p-3">
          <p>Username: {userProfile?.username}</p>
          <p>User email: {userProfile?.email}</p>
        </div> */}
        <EditProfile
          variant="edit"
          status="personal"
          userId={userId}
          title={userProfile?.username}
          description={userProfile?.email}
          address={userProfile?.address?userProfile?.address:""}
        />
      </div>
      <br/><br/>
      <div>
         <p className="text-lg font-semibold text-slate-700 hover:text-slate-600">My Coupon</p>
        {coupons.map((coupon) =>(
          <div key={coupon.id}>
            <Coupon percent={coupon.percent}/>
          </div>
        ))}
      </div>  

      <br/><br/>
      
      <div className="block items-center justify-top">
        <Link href={"/homepage/MyMarket"}>
          <p className="text-xl font-semibold text-slate-700 hover:text-orange-500">My Market</p>
        </Link>
        <div className="flex">
          <div className="block">
            {userProfile?.marketUrl ?(
              <div className="flex w-40 h-40 relative">
                {/* <img
                  src={userProfile?.marketUrl}
                  className="w-40 h-40  border-2 my-2 my-2 "           
                /> */}
                <Image
                  src={userProfile?.marketUrl}
                  alt='market Photo'
                  fill={true}
                />
              </div>
            ):(
              <><Store className="w-40 h-40 hover:text-yellow-500" /></>
            )}
            <AddImageButton userId={userId} status="market"/>
          </div>
          
          <EditProfile
              variant="edit"
              status="market"
              userId={userId}
              marketName={userProfile?.sellername}
              marketAddress={userProfile?.selleraddress}
              marketDescription={userProfile?.marketDescription}
              marketMessage={userProfile?.marketMessage}
            />
        </div>   
          
      </div>

    </div>
  );
}
export default HomePage;