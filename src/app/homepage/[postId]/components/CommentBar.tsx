import Link from "next/link";

import { MessageCircle } from "lucide-react";


type CommentBarProps = {
  text:string,
  author:string,
  stars:number,
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function CommentBar({
  text,author,stars
}: CommentBarProps) {

  return (
    <div 
    // id={id.toString()}
    className="flex flex-col gap-4 border rounded-md p-2 mx-2 my-2 mg-2"
    >
      <p className="font-bold">{author}</p>     
      <article className="mx-6 whitespace-pre-wrap break-all">{text}</article>
    </div>
  );
}
