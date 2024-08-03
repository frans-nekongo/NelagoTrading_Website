'use client';

import {GoogleMap, Marker, DistanceMatrixService, StandaloneSearchBox} from "@react-google-maps/api";
import React, {useState, useCallback, useEffect} from 'react';
import {Button, Card, CardBody} from "@nextui-org/react";
import {Radio, RadioGroup} from "@nextui-org/radio";

// Define the Marker position type
interface MarkerPosition {
    lat: number;
    lng: number;
    name?: string;  // Add name to the marker
}

const defaultMapCenter = {
    lat: -22.530857,
    lng: 17.039013
};
const defaultMapZoom = 7;

const defaultMapOptions: google.maps.MapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
    styles: [
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
                {visibility: 'on'} // Ensure labels are visible
            ]
        }
    ],
    mapTypeControl: true,
    fullscreenControl: false
};

const baseRates: { [key: string]: { [key: string]: number } } = {
    "Local": {
        "Small": 26.80,
        "Medium": 33.50,
        "Large": 40.20,
        "Extra Large": 50.25
    },
    "Cross Border": {
        "Small": 80.40,
        "Medium": 100.50,
        "Large": 120.60,
        "Extra Large": 150.75
    }
};

export const Map = () => {
    const [markers, setMarkers] = useState<MarkerPosition[]>([]);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [distance, setDistance] = useState<string | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
    const [selected, setSelected] = useState("Local");

    const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
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
            if (places && places.length > 0) {
                const place = places[0];
                if (place.geometry && place.geometry.location) {
                    const newMarker: MarkerPosition = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.name || 'Unknown'
                    };
                    if (markers.length < 2) {
                        setMarkers([...markers, newMarker]);
                    }
                    if (map) {
                        map.panTo(place.geometry.location);
                    }
                }
            }
        }
    }, [searchBox, markers, map]);

    const calculateDistance = useCallback(() => {
        if (markers.length === 2) {
            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [markers[0]],
                destinations: [markers[1]],
                travelMode: google.maps.TravelMode.DRIVING,
            }, (response, status) => {
                if (status === 'OK' && response) {
                    const distanceText = response.rows[0]?.elements[0]?.distance?.text;
                    if (distanceText) {
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

    const calculateEstimatedPrice = useCallback(() => {
        if (distance && selectedButton && selected) {
            const baseRate = baseRates[selected][selectedButton];
            if (baseRate) {
                const distanceValue = parseFloat(distance.replace(' km', ''));
                const price = baseRate * distanceValue;
                setEstimatedPrice(price);
            } else {
                console.error('Base rate not found for the selected service type and package size.');
            }
        }
    }, [distance, selectedButton, selected]);

    useEffect(() => {
        calculateEstimatedPrice();
    }, [distance, selectedButton, selected, calculateEstimatedPrice]);

    useEffect(() => {
        if (map) {
            map.setMapTypeId('roadmap');
            map.setOptions({
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'labels',
                        stylers: [
                            {visibility: 'on'}
                        ]
                    }
                ]
            });
        }
    }, [map]);

    const clearMarkers = () => {
        setMarkers([]);
        setDistance(null);
        setEstimatedPrice(null);
    };

    return (
        <div className="items-center flex flex-col gap-4 w-full max-h-fit">

            <h2 className="font-bold text-4xl mb-4">Pricing</h2>

            <div className="flex justify-center w-full">
                <div className="max-w-fit max-h-fit">
                    <div className="flex flex-col row-end-2 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <div
                            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 items-center content-stretch">
                            <RadioGroup
                                label=""
                                value={selected}
                                onValueChange={setSelected}
                                orientation={"horizontal"}
                                className="h-fit items-center w-full md:w-auto flex-1"
                            >
                                <Radio value="Local">Local</Radio>
                                <Radio value="Cross Border">Cross Border</Radio>
                            </RadioGroup>

                            <div className="flex w-full md:w-auto flex-1 justify-between gap-2">
                                {["Small", "Medium", "Large", "Extra Large"].map((size) => (
                                    <Button
                                        key={size}
                                        isIconOnly
                                        color="danger"
                                        aria-label={size}
                                        className={selectedButton === size ? "ring-2 ring-indigo-500" : ""}
                                        onClick={() => setSelectedButton(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Card
                                className="text-black w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <CardBody>
                                    <p>
                                        Distance: {distance}
                                        <br/>
                                        Selected: {selected}
                                        <br/>
                                        Selected Button: {selectedButton}
                                        <br/>
                                        From: {markers[0]?.name || 'N/A'} {/* Display location name if available */}
                                        <br/>
                                        To: {markers[1]?.name || 'N/A'} {/* Display location name if available */}
                                        <br/>
                                        Estimated
                                        Price: {estimatedPrice !== null ? `N$${estimatedPrice.toFixed(2)}` : 'N/A'}
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
                                <input type="text"
                                       placeholder="search place..."
                                       className="text-black p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                            </StandaloneSearchBox>
                            <button onClick={clearMarkers}
                                    className="w-fit p-2 bg-red-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                Clear Markers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="w-full md:w-2/3 h-[400px] rounded-t-lg">
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100%', borderRadius: '15px 15px 0 0'}}
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
                </div>
            </div>
        </div>
    );
};
