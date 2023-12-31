"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef,useState } from "react";
import useNotifications from "@/hooks/useNotifications"
import useCart from "@/hooks/useCart";
import Coupon from "@/app/homepage/MyAccount/components/Coupon";
import useCoupons from "@/hooks/useCoupon";
import { useToast } from "@/components/ui/use-toast"

type Props = {
  title:string,
  username:string,
  seller:string,
  money:number,
  postId:string,
  left:number,
  userId:string,
  coupons:{id:number,percent:number}[],
  handleGetCoupon:()=>void,
  useraddress: string,
};
function BuyNowDialog({ title,username,seller,money,postId,left,userId,coupons,handleGetCoupon, useraddress}:Props) {
  const [openBuyNowDialog,setOpenBuyNowDialog]=useState(false);
  const [totalPrice,setTotalPrice]=useState(money);
  const {loadingN,postNotification}=useNotifications();
  const {loading,deleteCart}=useCart();
  const {loadingD,deleteCoupons}=useCoupons();
  const { toast } = useToast()

  const inputRefProductNumber = useRef<HTMLInputElement>(null); 
  const inputRefAddress = useRef<HTMLInputElement>(null);
  const [showCouponDialog,setShowCouponDialog]=useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState(0);
  const [finalSelectedCoupon, setFinalSelectedCoupon] = useState(0);
  const [selectedId,setSelectedId]=useState(0);
  const [showPlaceOrderDialog, setShowPlaceOrderDialog] = useState(false);



  const handleCouponChange = (percentValue:number,id:number) => {
      // 否则，选择当前项
    setSelectedCoupon(percentValue);
    setSelectedId(id);
  };
  const handleCancelSelection = () => {
    // 点击 "取消选择" 时清除选择
    setSelectedCoupon(0);
    setSelectedId(0);
  };
  const handleCouponSelect = () => {
    setFinalSelectedCoupon(selectedCoupon);
    setShowCouponDialog(false);
  }
  const getCoupon=()=>{
    handleGetCoupon();
  }
  const handleBuy=async()=>{
    if(!inputRefProductNumber.current||!inputRefAddress.current){
      return;
    }
    if(inputRefAddress.current.value===""){
      // alert("enter something");
      toast({
        variant: "destructive",
        title: " Fail to Buy Product",
        description: "Please enter your address.",
      })
      return;
    }
    if(left<parseInt(inputRefProductNumber.current.value)){
      // alert("you buy too many");
      toast({
        variant: "destructive",
        title: " Fail to Buy Product",
        description: "You buy too many.",
      })
      return;
    }
    if(Math.round(totalPrice*(100-finalSelectedCoupon)/100)>2**31-1){
      // alert("you buy too many");
      toast({
        variant: "destructive",
        title: " Fail to Buy Product",
        description: "You don't have so much money.",
      })
      return;
    }
    await postNotification({
      text:title,
      buyer:username,
      seller,
      money:Math.round(totalPrice*(100-finalSelectedCoupon)/100),
      address:inputRefAddress.current.value,
      postId,
      number:parseInt(inputRefProductNumber.current.value),
    });
    await deleteCart({
      userId,
      postId,
    });
    if(finalSelectedCoupon!==0){
      await deleteCoupons({
        id:selectedId,
      });
    }
    setOpenBuyNowDialog(false)
  }

    const uniqueCoupons = Array.from(new Set(coupons.map((coupon) => coupon.percent)))
    .map((percent) => coupons.find((coupon) => coupon.percent === percent));

    const count_5=coupons.filter((coupon)=>coupon.percent===5).length; 
    const count_10=coupons.filter((coupon)=>coupon.percent===10).length;
    const count_20=coupons.filter((coupon)=>coupon.percent===20).length;


  return (
    <>
    <Button 
        className="flex font-semibold bg-slate-900 text-white hover:bg-yellow-500 hover:text-black "
        variant={"outline"}
        onClick={() => setOpenBuyNowDialog(true)}
        disabled={left===0}
        >Buy Now
    </Button>

      <Dialog open={openBuyNowDialog}>
      
      {/* <DialogTrigger asChild>
        
      </DialogTrigger> */}
      <DialogContent
        className="flex flex-col gap-4 w-3/4"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle className="text-yellow-500">View My Order</DialogTitle>
          <DialogDescription >Place your order now. </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">Your order</p>
          <p className="mr-2 ml-auto flex font-semibold text-yellow-500 text-2xl"> {title}</p>
        </div>
        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product Image</p>
          {/* <input
            className="flex w-full rounded-md border border-slate-900"
            type="text" //TODO: change to image
            placeholder="Product Image"
          /> */}

        </div>
        <div className="flex items-center">
            <p className="flex w-full font-semibold text-slate-900 " >Price (for each) </p>
            <p>${money}</p>
        </div>

        <div className="flex items-center">
            <p className="flex w-full font-semibold text-slate-900 " >Number to buy</p>
            <Input
              autoFocus
              className="grow"
              placeholder="Product number"
              type="number"
              defaultValue={1}
              ref={inputRefProductNumber}
              onChange={(e)=>setTotalPrice(money*parseInt(e.target.value))}
            />
        </div>
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900 " >Address</p>
          <Input
            autoFocus
            className="grow"
            placeholder="address"
            defaultValue={useraddress}
            ref={inputRefAddress}
          />
        </div>
        
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900 " >Coupon</p>
          <Button
            onClick={() => {setShowCouponDialog(true)}}
            className="flex bg-white hover:bg-white text-orange-700 hover:text-orange-500 "
          >

            {finalSelectedCoupon?(
              <p className="flex w-full font-semibold text-orange-500 ">{finalSelectedCoupon}% off</p>
              ):(
              <p className="flex w-full font-semibold text-orange-700 hover:text-orange-500 ">Select your coupon</p> )
            }

          </Button>
        </div>
      
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">Total Payment</p>
          <p>${Math.round(totalPrice*(100-finalSelectedCoupon)/100)}</p>
        </div>

        </div>

        <div className="flex w-full justify-end ">
        <Button
          className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
          onClick={async() => {setOpenBuyNowDialog(false)}} 
        >
            Close
        </Button>

        <Button 
          className="flex font-semibold hover:bg-yellow-500 hover:text-black "
          // onClick={handleBuy}
          onClick={()=>{setShowPlaceOrderDialog(true)}}
        >
            Place order
        </Button>
        </div>      
      </DialogContent>
    </Dialog>
    <Dialog open={showPlaceOrderDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Final confirmation</DialogTitle>
        </DialogHeader>
        <p>You are going to pay ${Math.round(totalPrice*(100-finalSelectedCoupon)/100)} to {seller}.</p>
        
        <div className="flex justify-end ml-auto">
          <Button
            className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
            onClick={async() => {setShowPlaceOrderDialog(false)}} 
          >Close</Button>
          <Button
            className="flex font-semibold hover:bg-yellow-500 hover:text-black "
            onClick={handleBuy} 
            disabled={(loading||loadingD||loadingN)}
          >Confirm</Button>
        </div>
        
      </DialogContent>
    </Dialog>

    <Dialog open={showCouponDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select shopEE Coupon</DialogTitle>
        </DialogHeader>
       
        
        <div className="block m-2 ">

        {/* //相同percent的coupon只能出現一個 */}

        {/* {uniqueCoupons.map((coupon) =>(
          <div className="flex">
            <input 
              type="radio" 
              name="selectCoupon" 
              onChange={() => handleCouponChange(coupon.percent,coupon.id)}
              checked={selectedCoupon === coupon.percent}
            />
            <Coupon percent={coupon.percent} />
          </div>
        ))} */}

        
        {uniqueCoupons.map((coupon) => (
          <div className="flex" key={coupon?.id}>
            {coupon && (
              <>
                <input 
                  type="radio" 
                  name="selectCoupon" 
                  onChange={() => handleCouponChange(coupon.percent, coupon.id)}
                  checked={selectedCoupon === coupon.percent}
                />
                <Coupon percent={coupon.percent} />
                {(coupon.percent===5)?(
          <div className="flex items-center justify-end font-bold w-full">
            {coupon.percent}% OFF coupon left: {count_5}
          </div>
          ):null
          }
          {(coupon.percent===10)?(
          <div className="flex items-center justify-end  font-bold w-full">
            {coupon.percent}%OFF coupon left:{count_10}
          </div>
          ):null
          }
          {(coupon.percent===20)?(
          <div className="flex items-center justify-end font-bold w-full">
            {coupon.percent}%OFF coupon left:{count_20}
          </div>
          ):null
          }
        </>
            )}

          </div>
        ))}

        {uniqueCoupons && (
          <>
            <input 
              type="radio" 
              name="selectCoupon" 
              onChange={handleCancelSelection}
              checked={selectedCoupon === 0}
            />
            <span className="text-slate-900 m-4">Clear all</span>
          </>
        )}


        { uniqueCoupons.length===0 &&(        
        <div className="text-red-500 font-bold text-2xl">
          You don't have coupons
          {/* 去抽獎 */}
        </div>)}

        {selectedCoupon!==0  && ( <p>Selected Coupon: {selectedCoupon}% off</p> )}
        
          
        </div>

        <div className="flex justify-end ml-auto">

          <Button
            className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
            onClick={async() => {setShowCouponDialog(false)}} 
          >Close</Button>

          {uniqueCoupons.length!==0&&
          <Button
            className="flex font-semibold hover:bg-yellow-500 hover:text-slate-700 "
            onClick={() => {handleCouponSelect()}} 
          >Select</Button>         
          }

          {uniqueCoupons.length===0&&
          <Button
            className="flex font-semibold hover:bg-yellow-500 hover:text-slate-700 "
            onClick={getCoupon} 
          >Get Coupon</Button>         
          }

        </div>
        
      </DialogContent>
    </Dialog>
    </>
  );
}
export default BuyNowDialog;