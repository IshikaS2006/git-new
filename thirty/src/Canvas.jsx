import canvasimages from "./images";
import {useEffect, useRef, useState} from "react";
import { useGSAP} from "@gsap/react";
import gsap from "gsap";

function Canvas({details}) {
  const {startIndex, numImages, duration} = details; // 🔧 FIXED: moved above useState
  const [index, setIndex] = useState({value:startIndex});
  const canvasRef = useRef(null);

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + 149,
      duration: 3,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({value: Math.round(index.value)});
      },
    });
  }, []);

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = canvasimages[index.value];

    img.onload = () => {
      // 🔧 FIXED: removed style.width/height to let it auto-resize
      canvas.width = img.offsetWidth * scale;
      canvas.height = img.offsetHeight * scale;
      canvas.style.width = img.offsetWidth * scale+"px";
      canvas.style.height = img.offsetHeight * scale+"px";
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, img.offsetWidth, img.offsetHeight);
    };
  }, [index]);

  return (
    <div>
      <canvas ref={canvasRef}
      style={{ width: `${size * 1.2}px`, height: `${size * 1.2}px`}}
      ></canvas>
    </div>
  )
}

export default Canvas;
