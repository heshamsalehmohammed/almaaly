import React, { useEffect, useRef, useState } from 'react';

const AnimatedCanvas = ({children}) => {
  const canvasRef = useRef(null);
  const [docWidth, setDocWidth] = useState(window.innerWidth);
  const [docHeight, setDocHeight] = useState(window.innerHeight);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const letterArray = useRef([]);
  let mX, mY = docHeight / 1.5, fX = docWidth / 2, mouse = false;

  // Random Number Generator
  const mR = (n, i) => Math.floor(Math.random() * n) + i;

  // Set Canvas Size
  const size = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setDocWidth(window.innerWidth);
    setDocHeight(window.innerHeight);
  };

  // Draw Text
  const dT = (x, y, t, s, c) => {
    const canvas = canvasRef.current;
    const con = canvas.getContext("2d");
    con.save();
    con.font = `${s}px monospace`;
    con.shadowColor = `rgba(255, 0, 0, ${c})`;
    con.shadowBlur = s / 2;
    con.fillStyle = `rgba(255, 0, 0, ${c})`;
    const tW = con.measureText(t).width;
    con.fillText(t, x - tW / 2, y);
    con.restore();
  };

  // Draw Rectangle
  const dR = (x, y, w, h, c) => {
    const canvas = canvasRef.current;
    const con = canvas.getContext("2d");
    con.save();
    con.beginPath();
    con.rect(x, y, w, h);
    con.fillStyle = c;
    con.fill();
    con.restore();
  };

  // Animation Frame
  const animate = () => {
    const canvas = canvasRef.current;
    const con = canvas.getContext("2d");
    con.clearRect(0, 0, canvas.width, canvas.height);

    letterArray.current.forEach((letter, i) => {
      dT(letter[0], letter[1], letter[2], letter[3], letter[4]);
      if (letter[6] === 2) {
        const rH = mR(540, 10);
        const sH = mR(rH, 1);
        dR(letter[0], letter[1] - sH, letter[3] / 1.5, rH, "rgba(255, 0, 0, 0.05)");
      }
    });
  };

  // Think Function
  const think = () => {
    const sC = mR(2, 1);
    if (fX <= docWidth / 2 + docWidth / 4 && !mouse) fX++;
    else if (!mouse) fX = docWidth / 2 - docWidth / 4;
    else fX = mX;

    if (sC === 1 || sC === 3) {
      letterArray.current.push([fX - 10 + mR(30, 0), mY + mR(30, 0), letters[mR(letters.length, 0)], mR(20, 8), 1, mR(6, 2) + Math.random() * 10 / 10, mR(30, 0)]);
    }

    letterArray.current.forEach((letter, i) => {
      if (sC === 2 && letter) letter[2] = letters[mR(letters.length, 0)];
      if (letter) letter[1] -= letter[5];
      if (letter[4] >= 0) letter[4] -= 0.01;
      else letterArray.current.splice(i, 1);
    });

    animate();
    mouse = false;
  };

  // Inject Function
  const inject = () => {
    size();
    setInterval(() => think(), 1000 / 60);
  };

  // Effect Hook
  useEffect(() => {
    // Set Canvas Dimensions on Load
    size();

    // Listen for Resize Events
    window.addEventListener('resize', size);

    // Listen for Mouse Move Events
    window.addEventListener('mousemove', (e) => {
      mX = e.pageX;
      mY = e.pageY - document.documentElement.scrollTop;
      mouse = true;
    });

    // Inject Canvas and Start Animation
    inject();

    // Cleanup on Component Unmount
    return () => {
      window.removeEventListener('resize', size);
      window.removeEventListener('mousemove', size);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 ,height:'100%', width:'100%'}}>{children}</canvas>
  );
};

export default AnimatedCanvas;
