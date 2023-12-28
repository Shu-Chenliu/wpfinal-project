// CouponDrawRule.tsx
"use client"
import React, { useState } from 'react';

import useCoupons from '@/hooks/useCoupon';
type SpinningWheelProps={
  userId: string,
}
const CouponDrawRule = () => {
  

  return (
    <div className="flex gap-4 p-2 mx-2 my-2 font-semibold border border-orange-600 rounded-md text-slate-900 w-3/5">
    在这个例子中，根据三个条件的不同组合，选择渲染不同的内容。你可以根据你的具体需求进行适当的调整。请注意，过多的嵌套可能会使代码变得难以阅读，因此根据实际情况，可能需要考虑使用其他更复杂的条件处理方式或者将逻辑提取到函数中。
    </div>
  );
};

export default CouponDrawRule;