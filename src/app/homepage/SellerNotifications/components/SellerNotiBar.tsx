"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import useNotifications from "@/hooks/useNotifications";
type SellerNotiBarProps = {
  id:number,
  text:string,
  buyer:string,
  money:number,
  address:string,
  category:string,
  read:boolean,
  left:number,
};


// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function SellerNotiBar({
  id,text,buyer,money,address,category,read,left
}: SellerNotiBarProps) {
  const [openNewCheckDialog, setOpenNewCheckDialog] = useState(false);
  const {updateNotification}=useNotifications();
  const handleCheckOrder = async()=>{
    
    await updateNotification({
      id,
      shipped:true,
      readBySeller:true,
    });
    setOpenNewCheckDialog(false);
  }
  let imageSrc;

  switch (category) {
    case "Clothing":
      imageSrc = "../../Clothing.jpg";
      break;
    case "Food":
      imageSrc = "../../Food.jpg";
      break;
    case "Electronics":
      imageSrc = "../../Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "../../EE_related.jpg";
      break;
    case "Others":
      imageSrc = "../../Others.jpg";
      break;
  }
  const contentToRender = (
    <>
      <div>
        <img src={imageSrc} alt="Product" className="w-32 h-auto" />
      </div>
      <div className="px-4">
        <div className="mb-4 ">
          {/* <p className="flex w-full font-semibold text-slate-900"> Product Name: {text} </p> */}
          <p className="flex font-semibold text-orange-700 text-xl">{text}</p>
          <p className="flex w-full font-semibold text-slate-900"> Buyer: {buyer}</p>
          <p className="flex w-full font-semibold text-slate-900"> Buyer Address: {address}</p>
          <p className="flex w-full font-semibold text-slate-900"> Payment recieve: {money}</p>
        </div>
      </div>

      <Button
        className={!read?"ml-auto bg-slate-700 hover:text-yellow-400 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100":"ml-auto bg-slate-200 hover:bg-slate-200 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100"}
        onClick={() => {
          if(read){
            return;
          }
          setOpenNewCheckDialog(true);
        }}
        disabled={left<=0}
      >
        Check Order
      </Button>
 
    </>

  );

  return (
    <>
    {read?
    (<div className="border rounded my-2 w-full mr-4 p-4 flex h-40 bg-slate-200">
      {contentToRender}
    </div>)
    :
    (<div className="border rounded my-2 w-full mr-4 p-4 flex h-40">
      {contentToRender}
    </div>

    )

      
    }
      {/* <div className="border rounded my-2 w-full mr-4 p-4 flex h-40"> */}
        {/* <div>
          <img src={imageSrc} alt="Product" className="w-32 h-auto" />
        </div>
        <div className="px-4">
          <div className="mb-4 ">
            <p className="flex w-full font-semibold text-slate-900"> Product Name: {text} </p>
            <p className="flex w-full font-semibold text-slate-900"> Buyer: {buyer}</p>
            <p className="flex w-full font-semibold text-slate-900"> Buyer Address: {address}</p>
            <p className="flex w-full font-semibold text-slate-900"> Payment recieve: {money}</p>
          </div>
        </div>

        <Button
          className="ml-auto bg-slate-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100"
          onClick={() => setOpenNewCheckDialog(true)}
        >
          Check Order
        </Button> */}
      {/* </div> */}
      <Dialog open={openNewCheckDialog}>

        <DialogContent
          className="flex flex-col gap-4 w-3/4"
          style={{ width: "500px" }}
          onInteractOutside={()=>{setOpenNewCheckDialog(false);}}
        >
          <DialogHeader>
            <DialogTitle className="text-orange-600">Check Order</DialogTitle>
            <DialogDescription>Are you sure to ship your product?</DialogDescription>
          </DialogHeader>
       
          <div className="flex w-full justify-end ">
          <Button
            className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
            onClick={async() => {setOpenNewCheckDialog(false); }} 
          >
            Close
          </Button>

          <Button
            className="text-sm font-semibold bg-slate-600  hover:text-yellow-500 hover:bg-slate-700"
            onClick={handleCheckOrder}
          >
            Check
          </Button>

          </div>      
        </DialogContent>
      </Dialog>
    </>
  );
}
