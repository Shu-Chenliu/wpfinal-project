import { Ticket } from 'lucide-react';

type CouponProps = {
  percent:number,
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Coupon({percent}: CouponProps) {

  return (
    <div 
    // id={id.toString()}
    className="h-15 item-center w-[130vh] flex gap-4 border rounded-md p-2 mx-2 my-2 mg-2 bg-cyan-700 text-white "
    >
      <Ticket size={30} />
      <p className="font-semibold">{percent} % OFF</p>     
      {/* <article className="mx-6 whitespace-pre-wrap break-all"></article> */}
    </div>
  );
}
