"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
};
function BuyNowDialog({ title,username,seller,money,postId,left,userId,coupons,handleGetCoupon}:Props) {
  const [openBuyNowDialog,setOpenBuyNowDialog]=useState(false);
  const [totalPrice,setTotalPrice]=useState(money);
  const {postNotification}=useNotifications();
  const {deleteCart}=useCart();
  const {deleteCoupons}=useCoupons();
  const { toast } = useToast()

  const inputRefProductNumber = useRef<HTMLInputElement>(null); 
  const inputRefAddress = useRef<HTMLInputElement>(null);
  const [showCouponDialog,setShowCouponDialog]=useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState(0);
  const [finalSelectedCoupon, setFinalSelectedCoupon] = useState(0);
  const [selectedId,setSelectedId]=useState(0);



  const handleCouponChange = (percentValue:number,id:number) => {

    if (selectedCoupon === percentValue) {
      // 如果当前已选中，则取消选择
      setSelectedCoupon(0);
      setSelectedId(id);
    } else {
      // 否则，选择当前项
      setSelectedCoupon(percentValue);
    }
  };
  const handleCancelSelection = () => {
    // 点击 "取消选择" 时清除选择
    setSelectedCoupon(0);
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

  return (
    <>
    <Button 
        className="flex font-semibold hover:bg-orange-700 hover:text-black "
        variant={"outline"}
        onClick={() => setOpenBuyNowDialog(true)}
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
          <DialogTitle>View My Order</DialogTitle>
          <DialogDescription>Place your order now. </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900 text-2xl"> {title}</p>
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
            <p className="flex w-full font-semibold text-slate-900 " >Price (for each): </p>
            <p>{money}</p>
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
          <p>{Math.round(totalPrice*(100-finalSelectedCoupon)/100)}</p>
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
          className="flex font-semibold hover:bg-orange-700 hover:text-black "
          onClick={handleBuy}
        >
            Place order
        </Button>
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
            <span className="text-slate-900 m-4">Cancel selection</span>
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
            className="flex font-semibold hover:bg-orange-700 hover:text-black "
            onClick={() => {handleCouponSelect()}} 
          >Select</Button>         
          }

          {uniqueCoupons.length===0&&
          <Button
            className="flex font-semibold hover:bg-orange-700 hover:text-black "
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