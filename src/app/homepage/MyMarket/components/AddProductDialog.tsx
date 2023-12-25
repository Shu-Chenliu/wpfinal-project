"use client";
import { Button } from "@/components/ui/button";
import { useRef,useState} from "react";
import  usePost from "@/hooks/usePosts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Props = {
  userDisplayId:string;
};
function AddProductDialog({userDisplayId}:Props) {
  //useRef抓取input的值
  const inputRefProductName = useRef<HTMLInputElement>(null);
  const inputRefProductDescription = useRef<HTMLTextAreaElement>(null);
  const inputRefProductCategory = useRef<HTMLSelectElement>(null);
  const inputRefProductPrice = useRef<HTMLInputElement>(null);
  const inputRefProductNumber = useRef<HTMLInputElement>(null);
  const [openNewAddProductDialog,setOpenAddProductDialog]=useState(false);
  const {postProduct}=usePost();
  function isNumeric(value:string) {
    return /^\d+$/.test(value);
  }
  const handlePostProduct = async()=>{
    if(!inputRefProductName.current||!inputRefProductDescription.current||!inputRefProductCategory.current||!inputRefProductPrice.current||!inputRefProductNumber.current) {
      alert("不ok喔");
      return;
    }
    const title=inputRefProductName.current.value;
    const description=inputRefProductDescription.current.value;
    if(!isNumeric(inputRefProductPrice.current.value)||!isNumeric(inputRefProductNumber.current.value)){
      alert("要是數字");
      return;
    }
    const category = inputRefProductCategory.current.value;
    const price=parseInt(inputRefProductPrice.current.value);
    const left =parseInt(inputRefProductNumber.current.value);
    await postProduct({
      title:title,
      description:description,
      authorId:userDisplayId,
      category:category,
      price:price,
      left:left,
    });
  }
  
  return (
    <>
      <Button 
          className="text-sm font-semibold text-slate-100 bg-slate-900 "
          variant={"outline"}
          onClick={() => setOpenAddProductDialog(true)}
          >add product
      </Button>
      <Dialog open={openNewAddProductDialog}>
        {/* <DialogTrigger asChild>
          <Button 
          className="text-sm font-semibold text-slate-100 bg-slate-900 "
          variant={"outline"}
          >add product
          </Button>
        </DialogTrigger> */}
        <DialogContent
          className="flex flex-col gap-4 w-3/4"
          style={{ width: "500px" }}
        >
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Post what you want to sell. </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <p className="flex w-full font-semibold text-slate-900">Product Name</p>

            <Input
              autoFocus
              className="grow"
              placeholder="Product Name"
              ref={inputRefProductName}
            />
          </div>
          <div className="flex items-center">

            <p className="flex w-full font-semibold text-slate-900">Product description</p>
            <textarea
              className="bg-white/0 p-2 w-full outer-glow border border-slate-500 rounded-md"
              autoFocus
              placeholder="Product description"
              ref={inputRefProductDescription}
            />
          </div>

          <div className="flex items-center">

            <p className="flex w-full font-semibold text-slate-900">Product Category</p>
            <select className="grow" name="" id="tags" ref={inputRefProductCategory}>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Electronics">Electronics</option>
              <option value="EE related">EE related</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="flex items-center">

            <p className="flex w-full font-semibold text-slate-900">Product Price</p>

            <Input
              autoFocus
              className="grow"
              placeholder="Product price"
              type="number"
              ref={inputRefProductPrice}
            />
          </div>

          <div className="flex items-center">

            <p className="flex w-full font-semibold text-slate-900 " >Product number</p>

            <Input
              autoFocus
              className="grow"
              placeholder="Product number"
              type="number"
              ref={inputRefProductNumber}
            />

          </div>

          <div className="flex items-center">

            <p className="flex w-full font-semibold text-slate-900">Product Image</p>
            {/* <input
              className="flex w-full rounded-md border border-slate-900"
              type="text" //TODO: change to image
              placeholder="Product Image"
            /> */}

          </div>
          </div>

          <div className="flex w-full justify-end ">
            <Button className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-orange-400"
              onClick={async () => {
              await handlePostProduct();
              setOpenAddProductDialog(false);
              }}
            >
              Post
            </Button>
          </div>      
        </DialogContent>
      </Dialog>
    </>
  );
}
export default AddProductDialog;