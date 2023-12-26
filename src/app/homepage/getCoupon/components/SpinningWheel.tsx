// components/SpinningWheel.js
"use client"
import React, { useState } from 'react';
import styles from './SpinningWheel.module.css';
import { Button } from '@/components/ui/button';
const SpinningWheel = () => {
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (!spinning) {
      // Generate a random angle for spinning
      const randomAngle = Math.floor(Math.random() * 360) + 720; // Spins 2 times
      setSpinning(true);

      // Rotate the wheel
      const wheel = document.getElementById('wheel');
      if (wheel!==null){
        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `rotate(${randomAngle}deg)`;
      }
      // Reset spinning state after the animation completes
      setTimeout(() => {
        setSpinning(false);
        if (wheel!==null){
        wheel.style.transition = 'none';
        wheel.style.transform = 'rotate(0deg)';
        }
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div id="wheel" className={`${styles.wheel} ${spinning ? styles.spin : ''}`} />
      <Button onClick={handleSpin} disabled={spinning}>
        Spin
      </Button>
    </div>
  );
};

export default SpinningWheel;