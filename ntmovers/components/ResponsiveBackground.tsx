"use client"
import React, { useState, useEffect, ReactNode } from "react";

interface ResponsiveBackgroundProps {
    children: ReactNode;
}

let imgMain="https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/Banner/truck%20banner%20horizontal.png?t=2024-08-08T17%3A58%3A31.413Z"
let imgSmallMain="https://vrqkpbknrgocvvpnaios.supabase.co/storage/v1/object/public/Banner/truck%20banner%20vertical.png?t=2024-08-08T18%3A01%3A00.817Z"
const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({ children }) => {
    const [externalImageUrl, setExternalImageUrl] = useState(imgMain);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 640;
            setExternalImageUrl(isMobile
                ? imgSmallMain
                : imgMain);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${externalImageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
            }}
            className="w-full flex flex-col items-center bg-white"
        >
            {children}
        </div>
    );
};

export default ResponsiveBackground;
