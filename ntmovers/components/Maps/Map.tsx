'use client'

import {GoogleMap, Marker, DistanceMatrixService, StandaloneSearchBox} from "@react-google-maps/api";
import {useState, useCallback, useEffect} from 'react';

// Define the Marker position type
interface MarkerPosition {
    lat: number;
    lng: number;
}

// Map's styling
export const defaultMapContainerStyle = {
    width: '400px',
    height: '400px',
    borderRadius: '15px 0px 0px 15px',
};

const defaultMapCenter = {
    lat: -22.530857,
    lng: 17.039013
}
const defaultMapZoom = 18

const defaultMapOptions: google.maps.MapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
    styles: [
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
                {visibility: 'on'} // Ensure labels are visible
            ]
        }
    ],
    mapTypeControl: false, // Disable default map type control to manage types programmatically
    fullscreenControl: false
};

export const Map = () => {
    const [markers, setMarkers] = useState<MarkerPosition[]>([]);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [distance, setDistance] = useState<string | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) { // Check if e.latLng is not null
            if (markers.length < 2) {
                setMarkers([...markers, {lat: e.latLng.lat(), lng: e.latLng.lng()}]);
            }
        }
    }, [markers]);

    const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    }, []);

    const onPlacesChanged = useCallback(() => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) { // Check if places is defined and has elements
                const place = places[0];
                if (place.geometry && place.geometry.location) { // Check if geometry and location are defined
                    const newMarker: MarkerPosition = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    };
                    if (markers.length < 2) {
                        setMarkers([...markers, newMarker]);
                    }
                } else {
                    console.error('Place does not have geometry or location.');
                }
            }
        }
    }, [searchBox, markers]);

    const calculateDistance = useCallback(() => {
        if (markers.length === 2) {
            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [markers[0]],
                destinations: [markers[1]],
                travelMode: google.maps.TravelMode.DRIVING,
            }, (response, status) => {
                if (status === 'OK' && response) { // Ensure response is defined
                    const distanceText = response.rows[0]?.elements[0]?.distance?.text;
                    if (distanceText) { // Ensure distanceText is defined
                        setDistance(distanceText);
                    } else {
                        console.error('Distance information not available.');
                    }
                } else {
                    console.error('Distance Matrix Service failed:', status);
                }
            });
        }
    }, [markers]);

    useEffect(() => {
        if (map) {
            map.setMapTypeId('satellite');
            map.setOptions({
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'labels',
                        stylers: [
                            {visibility: 'on'} // Ensure labels are visible
                        ]
                    }
                ]
            });
        }
    }, [map]);

    return (
        <div className="relative w-3/6 max-h-fit">
            <div>
                <p>ff</p>
               {distance && <div>Distance: {distance}</div>}
            </div>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((position, idx) => (
                    <Marker key={idx} position={position}/>
                ))}
                {markers.length === 2 && (
                    <DistanceMatrixService
                        options={{
                            origins: [markers[0]],
                            destinations: [markers[1]],
                            travelMode: google.maps.TravelMode.DRIVING
                        }}
                        callback={(response, status) => {
                            if (status === 'OK' && response) {
                                const distanceText = response.rows[0].elements[0].distance.text;
                                setDistance(distanceText);
                            }
                        }}
                    />
                )}
            </GoogleMap>

            <div style={{position: 'absolute', top: '10px', left: '10px', zIndex: 1}}>
                <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
                    <input type="text" placeholder="Search places..." style={{width: '300px', padding: '5px'}}/>
                </StandaloneSearchBox>
            </div>

        </div>
    );
};