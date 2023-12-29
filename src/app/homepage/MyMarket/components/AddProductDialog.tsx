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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import { ShoppingBag } from 'lucide-react';

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
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast()

  function isNumeric(value:string) {
    return /^\d+$/.test(value);
  }
  const handlePostProduct = async()=>{
    if(!inputRefProductName.current||!inputRefProductDescription.current||!inputRefProductCategory.current||!inputRefProductPrice.current||!inputRefProductNumber.current) {
      toast({
        variant: "destructive",
        title: " Fail to Add Product",
        description: "Please enter product name",
      })
      return;
    }
    const title=inputRefProductName.current.value;
    const description=inputRefProductDescription.current.value;
    if(!isNumeric(inputRefProductPrice.current.value)){
      // alert("要是數字");
      toast({
        variant: "destructive",
        title: " Fail to Add Product",
        description: "Product price must be a number",
      })
      return;
    }
    if(!isNumeric(inputRefProductNumber.current.value)){
      // alert("要是數字");
      toast({
        variant: "destructive",
        title: " Fail to Add Product",
        description: "Product number must be a number",
      })
      return;
    }
    
    const category = inputRefProductCategory.current.value;
    const price=parseInt(inputRefProductPrice.current.value);
    const left =parseInt(inputRefProductNumber.current.value);
    if(!imageRef.current)return;
    if(!imageRef.current.files)return;
    if(imageRef.current.files.length===0){
      await postProduct({
        title:title,
        description:description,
        authorId:userDisplayId,
        category:category,
        price:price,
        left:left,
      });
    }
    else{
      const reader = new FileReader();
      let imageSrc="";
      console.log("image");
      console.log(imageRef.current.files);
      try {
        if (imageRef.current.files[0].size/1024 > 70) {
          // alert("Image size must be less than 70KB");
          toast({
            variant: "destructive",
            // title: " Fail to Upload",
            description: "Image size must be less than 70KB",
          })
          throw new Error();
        }
        reader.onload = async function (e) {
          if(typeof e.target?.result==="string"){
            imageSrc=e.target.result;
            await postProduct({
              title:title,
              description:description,
              authorId:userDisplayId,
              category:category,
              price:price,
              left:left,
              imageUrl:imageSrc,
            });
          } 
        };
        reader.readAsDataURL(imageRef.current.files[0]);
      }
      catch {
        // alert("Failed to upload image");
        toast({
          variant: "destructive",
          // title: " Fail to Add Product",
          description: "Failed to upload image",
        })
        imageRef.current.value = "";
        return;
      }
      imageRef.current.value = "";
    }
    setOpenAddProductDialog(false);
  }
  
  return (
    <>
      <Button 
          className="ml-auto font-semibold text-slate-100 bg-slate-900 hover:bg-cyan-500 hover:text-slate-700 "
          variant={"outline"}
          onClick={() => setOpenAddProductDialog(true)}
          >
            <ShoppingBag size={20} className="mr-1"/><span className="max-[475px]:hidden">Add Product</span>
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
            <DialogTitle className="text-cyan-500">Add Product</DialogTitle>
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
          <div id="image-box">
            <input 
              type="file" 
              accept="image/*"
              id="upload-image"
              ref={imageRef}
            />
          </div>
          <div className="flex w-full justify-end ">
          <Button
            className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
            onClick={async() => {setOpenAddProductDialog(false)}} 
          >
            Close
          </Button>
            <Button className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-cyan-500 hover:text-slate-700"
              onClick={handlePostProduct}
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