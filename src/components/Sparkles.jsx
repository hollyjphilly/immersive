import React from "react";
import sparkle from "../assets/sparkle.svg";
import './Sparkles.css';

function getRandom(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export default function Sparkles() {
    return (
        <div>
            {Array.from(Array(40)).map((v,i) => {
                const size = [8,9,10,10,20][getRandom(0, 5)] + 'px';
                return (
                    <img 
                        key={i}
                        className="star"
                        src={sparkle}
                        alt="sparkle"
                        style={{ 
                            top: getRandom(0, 100) + 'vh',
                            left: getRandom(0, 100) + 'vw',
                            animationDelay: getRandom(0, 4) + 's',
                            height: size,
                            width: size,
                        }}
                    />
                );
            })}
        </div>
    );
}
  