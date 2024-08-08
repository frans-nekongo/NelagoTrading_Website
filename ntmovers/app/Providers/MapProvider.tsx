'use client';

import {Libraries, useJsApiLoader} from '@react-google-maps/api';
import React, {ReactNode} from 'react';
import {Spinner} from "@nextui-org/react";

// Define the libraries you want to load
const libraries: Libraries = ['places', 'geometry', 'marker']; // Add 'marker' here

export function MapProvider({children}: { children: ReactNode }) {
    // Load the Google Maps JavaScript API asynchronously
    const {isLoaded: scriptLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        libraries: libraries,
    });

    if (loadError) return <p>Encountered error while loading google maps</p>

    if (!scriptLoaded) return (
        <div className="bg-white h-screen flex items-center justify-center">
            <Spinner
                size="lg"
                labelColor="success"
                label="NT MOVERS Loading..."
                color="success"
                className="text-4xl" // Adjust size as needed
            />
        </div>

    )

    // Return the children prop wrapped by this MapProvider component
    return children;
}
