"use client";
import { Button } from "@/components/ui/button";

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

};
function AddProductDialog() {
  const {postProduct}=usePost();
  const handlePostProduct = async()=>{
    await postProduct({
      title:"Product",
      description:"ProductDESCRIPTION",
      authorId:"88e2d757-ac60-4be7-bd4f-ef6c0cc4fce7",
      price:300,
      left:300,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
        className="text-sm font-semibold text-slate-100 bg-slate-900 "
        variant={"outline"}
        >add product
        </Button>
      </DialogTrigger>
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
          />
        </div>
        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product description</p>
          <textarea
            className="bg-white/0 p-2 w-full outer-glow border border-slate-500 rounded-md"
            autoFocus
            placeholder="Product description"
          />
        </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product Category</p>
          <select className="grow" name="" id="tags">
            <option value="1">Clothing</option>
            <option value="2">Food</option>
            <option value="3">Electronics</option>
            <option value="4">EE related</option>
            <option value="5">Others</option>
          </select>
        </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product Price</p>

          <Input
            autoFocus
            className="grow"
            placeholder="Product price"
          />
        </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900 " >Product number</p>

          <Input
            autoFocus
            className="grow"
            placeholder="Product number"
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
            onClick={handlePostProduct}
          >
            Post
          </Button>
        </div>      
      </DialogContent>
    </Dialog>
  );
}
export default AddProductDialog;