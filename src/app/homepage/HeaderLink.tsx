"use client";
import Link from "next/link";
type Props={
  username: string,
}
export default function HeaderLink({username}:Props){
  return(
    <Link href={"/homepage"} onClick={()=>{
      window.location.href = "/homepage";
    }}>
      <p className="text-slate-100 hover:text-orange-500 font-semibold m-2 p-2 max-[760px]:hidden">Welcome to shopEE, {username}.</p>
      <p className="text-slate-100 hover:text-orange-500 font-semibold m-2 p-2 hidden max-[760px]:block">shopEE</p>
    </Link>
  );
} 