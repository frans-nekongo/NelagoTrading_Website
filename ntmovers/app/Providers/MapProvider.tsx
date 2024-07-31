'use client';

import {Libraries, useJsApiLoader} from '@react-google-maps/api';
import {ReactNode} from 'react';

// Define the libraries you want to load
const libraries: Libraries = ['places', 'geometry'];

export function MapProvider({children}: { children: ReactNode }) {

    // Load the Google Maps JavaScript API asynchronously
    const {isLoaded: scriptLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        libraries: libraries,
    });

    if (loadError) return <p>Encountered error while loading google maps</p>

    if (!scriptLoaded) return <p>Map Script is loading ...</p>

    // Return the children prop wrapped by this MapProvider component
    return children;
}
