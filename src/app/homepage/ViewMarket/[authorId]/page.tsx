
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { Store } from 'lucide-react';
import {getAllproductOfUser,getSellerInfo} from "./components/actions"
import MyMarketProductButton from "./components/MyMarketProductButton";
import Image from "next/image";
type Props = {
  params: {
    authorId: string;
  };
};
async function HomePage({params:{authorId}}: Props) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session.user.id;
  const ProductsPostedByUser = await getAllproductOfUser(authorId);
  const userInfo = await getSellerInfo(userDisplayId);
  return (

    <div className="flex flex-col h-[90vh] w-full">
      <div className="flex items-center justify-top ">
        <p className="text-2xl m-2 p-2 font-semibold text-slate-700">
          Welcome to {userInfo?.sellername}'s Market
        </p>
      
      </div>

      <div className="ml-3 pl-3 block items-center justify-top">
          
        <div className="flex">
          <div className="block">
            {userInfo?.marketUrl ?(
              <div className="flex relative w-40 h-40">
                {/* <img
                  src={userInfo?.marketUrl!}
                  className="w-40 h-40  border-2 my-2 my-2 "           
                /> */}
                <Image
                  src={userInfo?.marketUrl}
                  alt="market Photo"
                  fill={true}
                  className="object-contain"
                />
              </div>
            ):(
              <><Store className="w-40 h-40 hover:text-cyan-700" /></>
            )}
            {/* <><Store className="w-40 h-40 hover:text-cyan-700" /></> */}
           
          </div>
          <div className="block ml-3 justify-center item-center ">
            <p className="text-xl font-bold text-slate-700 hover:text-cyan-700">{userInfo?.sellername}</p>
            <p className="hover:text-cyan-700"> Located at {userInfo?.selleraddress}</p>
            <p className="text-slate-500 hover:text-cyan-900"> {userInfo?.marketDescription} </p>
                       
          </div>
          
          
          
        </div>   
          
      </div>
      <br />

      <div>
      <p className="ml-6 text-xl font-bold text-slate-700 hover:text-cyan-700">{userInfo?.sellername}'s products</p>
      </div>

      <div className="ml-8 flex flex-wrap gap-4 ">
        {ProductsPostedByUser.map((product) => (
          <MyMarketProductButton
            key={product.id}
            id={product.id}
            displayId={product.displayId}
            title={product.title}
            category={product.category}
            price={product.price}
            likes={product.likes}
            left={product.left}
            imageUrl={product.imageUrl!}
          />
        ))}
      </div>
    </div>

  );
}
export default HomePage;