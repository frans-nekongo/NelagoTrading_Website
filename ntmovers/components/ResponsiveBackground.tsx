"use client"
import React, { useState, useEffect, ReactNode } from "react";

interface ResponsiveBackgroundProps {
    children: ReactNode;
}

let imgMain="https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Banners%2Ftruck%20banner%20horizontal.png?alt=media&token=609e99fc-578a-4797-a415-6ea9ddeec43a"
let imgSmallMain="https://firebasestorage.googleapis.com/v0/b/ntmovers-e1717.appspot.com/o/Banners%2Ftruck%20banner%20vertical.png?alt=media&token=bde1efab-0582-4543-b080-aa4ea5d3b53d"
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
