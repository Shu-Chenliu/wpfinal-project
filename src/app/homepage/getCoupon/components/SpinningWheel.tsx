//SpinningWheel.js
"use client"
import React, { useState } from 'react';
import styles from './SpinningWheel.module.css';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import Coupon from '../../MyAccount/components/Coupon';
import useCoupons from '@/hooks/useCoupon';
import CouponDrawRule from './CouponDrawRule';
import { ArrowBigDown } from 'lucide-react';

type SpinningWheelProps={
  userId: string,
}
const SpinningWheel = ({userId}:SpinningWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  // const [rotationAngle, setRotationAngle] = useState(0);
  const {postCoupon}=useCoupons();
  const { toast } = useToast()
  const handleSpin = async() => {
    if (!spinning) {
      // Generate a random angle for spinning
      const randomAngle = Math.floor(Math.random() *360) // Spins 3 times +360*50;
      const rotationAngle = randomAngle+360*50;
      setSpinning(true);
      console.log(randomAngle);
      // Rotate the wheel
      const wheel = document.getElementById('wheel');
      if (wheel!==null){
        // setRotationAngle(rotationAngle + randomAngle); // Update the rotation angle dynamically
        // wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${rotationAngle}deg)`;
      }
      // Reset spinning state after the animation completes
      setTimeout(async() => {
        setSpinning(false);
        if (wheel!==null){
        wheel.style.transition = 'none';
        }
        
        if(wheel!==null){ 
          if((0<=randomAngle && randomAngle<108)){
            toast({
              variant:"success",
              title: "Congratulations!",
              description: "You get a 20%OFF coupon! ",
            })

            await postCoupon({
              owner:userId,
              percent:20,//TODO:getpercent
            });
          wheel.style.transform = 'rotate(0deg)';
        }
        if((108<=randomAngle && randomAngle<252)){

          toast({
            variant:"success",
            title: "Congratulations!",
            description: "You get a 10%OFF coupon!",
          })

          await postCoupon({
            owner:userId,
            percent:10,//TODO:getpercent
          });
          wheel.style.transform = 'rotate(0deg)';
        }
        if((252<=randomAngle && randomAngle<=360)){
          toast({
            variant:"success",
            title: "Congratulations!",
            description: "You get a 5%OFF coupon!",
          })
          await postCoupon({
            owner:userId,
            percent:5,//TODO:getpercent
          });
          wheel.style.transform = 'rotate(0deg)';
        }
      }
        // setRotationAngle(rotationAngle + randomAngle)
      }, 5000);
      
    }
  };

  return (
    <>
    <div className={styles.container}>
      <div className='flex flex-row'>
        <div className='flex flex-col'>      
          <CouponDrawRule/>
          <div className="m-4">
            <Button onClick={handleSpin} disabled={spinning} className='hover:bg-orange-500'>
              Spin
            </Button>
          </div>
        </div>

        <div className=" my-2 items-center flex flex-col">
            <ArrowBigDown size={50}/>
          <div id="wheel" className={`${styles.wheel} ${spinning ? styles.spin : ''}`} />
        </div>
      </div>

      <div className="my-2  flex flex-col">
        <Coupon percent={5}/>
        <br/>
        <Coupon percent={10}/>
        <br/>
        <Coupon percent={20}/>
        <br/>
      </div>

      </div>
    </>
  );
};

export default SpinningWheel;