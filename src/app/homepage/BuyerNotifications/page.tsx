
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import ConfirmDialog from "./components/ConfirmDialog";
import Notification from "./components/Notification";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
type Props = {

};
async function NotificationPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const sample_arr: {
    id:string,
    title:string,
    left: number,
    author:string,
    sold:number,
    likes:number,
    }[ ] = [
    { id: "1", title: "1", left: 1,author:"susan", sold:5,likes:3.5},
    { id: "2", title: "2", left: 2,author:"susan", sold:6,likes:2.5},
    { id: "3", title: "3", left: 3,author:"susan", sold:10,likes:2.9},
  ];
  const userDisplayId = session?.user?.id;
  return (
    <>
      <div>buyer notification</div>
      {sample_arr.map((notification)=>(
        <div key={notification.id}>
          <Notification 
            id={notification.id} 
            title={notification.title} 
            left={notification.left} 
            author={notification.author}
            sold={notification.sold}
            likes={notification.likes}
            userId={userDisplayId}
          />
        </div>
      ))}
    </>
  );
}
export default NotificationPage;