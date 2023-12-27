"use client";
import { Ticket } from 'lucide-react';
import {Button} from "@/components/ui/button";
import{useRef,useState,useEffect}from "react";
import useUsers from "@/hooks/userUsers"
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
  const handleUploadImage=async()=>{
    console.log("uploadImage");
    if(!imageRef.current)return;
    if(!imageRef.current.files)return;
    console.log("reader");
    const reader = new FileReader();
    let imageSrc="";
    try {
      if (imageRef.current.files[0].size/1024 > 70) {
        alert("圖片大小不可超過70KB");
        throw new Error();
      }
      reader.onload = async function (e) {
        if(typeof e.target?.result==="string"){
          console.log("string");
          console.log(e.target.result);
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
      alert("無法上傳圖片");
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
      <Button
        onClick={handleUploadImage}
      >
      </Button>
    </div>
    </>

  );
}