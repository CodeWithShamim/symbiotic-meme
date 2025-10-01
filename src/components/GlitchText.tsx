"use client";

import React from "react";

export default function GlitchText({ children }: { children: string }) {
  return (
    <h1
      className="
        relative
        text-[clamp(4rem,10vw,8rem)]
        font-bold
        text-green-400
        tracking-widest
        uppercase
        text-center
        select-none
        after:content-[attr(data-text)]
        before:content-[attr(data-text)]
      "
      data-text={children}
    >
      {children}
      <style jsx>{`
        h1 {
          text-shadow: 0 0 10px #0f0, 0 0 20px #0f0;
          animation: glitch 1s infinite;
        }

        h1::before,
        h1::after {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
        }

        h1::before {
          color: #f00; /* red ghost */
          animation: glitchTop 1s infinite linear alternate-reverse;
        }

        h1::after {
          color: #0ff; /* blue ghost */
          animation: glitchBottom 1.5s infinite linear alternate-reverse;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitchTop {
          0% {
            clip: rect(0, 9999px, 0, 0);
          }
          10% {
            clip: rect(10px, 9999px, 40px, 0);
            transform: translate(-5px, -5px);
          }
          50% {
            clip: rect(85px, 9999px, 140px, 0);
            transform: translate(5px, 0);
          }
          100% {
            clip: rect(0, 9999px, 0, 0);
          }
        }

        @keyframes glitchBottom {
          0% {
            clip: rect(0, 9999px, 0, 0);
          }
          10% {
            clip: rect(50px, 9999px, 80px, 0);
            transform: translate(5px, 5px);
          }
          50% {
            clip: rect(130px, 9999px, 170px, 0);
            transform: translate(-5px, 0);
          }
          100% {
            clip: rect(0, 9999px, 0, 0);
          }
        }
      `}</style>
    </h1>
  );
}
