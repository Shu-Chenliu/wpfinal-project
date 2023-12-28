"use client";
import { Ticket } from 'lucide-react';
import {Button} from "@/components/ui/button";
import{useRef,useState,useEffect}from "react";
import useUsers from "@/hooks/userUsers"
import { useToast } from '@/components/ui/use-toast';
// note that the Tweet component is also a server component
// all client side things are abstracted away in other components

type Props={
  userId:string,
}
export default function AddImageButton({userId}:Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  // const [imageSrc,setImageSrc]=useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const {updateUser}=useUsers();
  const {toast}=useToast();
  const handleUploadImage=async()=>{
    if(!imageRef.current)return;
    if(!imageRef.current.files)return;
    const reader = new FileReader();
    let imageSrc="";
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
          await updateUser({
            id:userId,
            imageURL:imageSrc,
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
  
  return (
    <>
    <div className='flex'>
      
        <div id="image-box">
          <input 
            type="file" 
            accept="image/*"
            id="upload-image"
            ref={imageRef}

    
          />
        </div>
      {/* <Button
        onClick={handleUploadImage}
      >
      </Button> */}
      <Button
        onClick={handleUploadImage}
        className="flex font-semibold bg-slate-600  hover:bg-yellow-500 hover:text-slate-700"
      >
        Press to upload image
      </Button>
    </div>
    </>

  );
}