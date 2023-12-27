import { Ticket } from 'lucide-react';


type CouponProps = {
  percent:number,
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Coupon({percent}: CouponProps) {

  return (
    <>
    <div className='flex'>

      {percent===5?

        (<div 
        // id={id.toString()}
        className="h-15 items-center w-2/3 flex gap-4 border rounded-md p-2 mx-2 text-white"
        style={{ background: '#1f3b4e'}}
        >
          <Ticket size={30} />
          <p className="font-semibold justify-self-center">5% OFF</p>

        </div>):

      percent===10?

        (<div
        // id={id.toString()}
        className="h-15 item-center w-2/3 flex gap-4 border rounded-md p-2 mx-2  text-white "
        style={{ background: '#e39d1a'}}
        >
          <Ticket size={30} />
          <p className="font-semibold">10% OFF</p>
        </div>):

        (<div
          // id={id.toString()}
          className="h-15 item-center w-2/3 flex gap-4 border rounded-md p-2  mx-2  text-white "
          style={{ background: '#269a9a'}}
          >
            <Ticket size={30} />
            <p className="font-semibold">20% OFF</p>
          </div>)
    }
    </div>
    </>

  );
}