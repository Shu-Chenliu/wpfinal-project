// CouponDrawRule.tsx
"use client"
import React from 'react';

function CouponDrawRule(){
  

  return (
    <div className="flex p-2 mx-2 my-2  rounded-md text-slate-900 ">
      <div className="block ">
        <p className="flex font-semibold text-slate-900">Coupon Draw Rule</p>
        <div className='block ml-3 text-slate-900'>
          <div className='flex'><p>Press<strong> Spin </strong>to draw a coupon!</p></div>
          
          <p>You can view your coupons at "My Account".</p>
        </div>     
      </div>
    </div>
  );
};

export default CouponDrawRule;