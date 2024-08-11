'use client';

import {GoogleMap, DistanceMatrixService, StandaloneSearchBox, Marker} from "@react-google-maps/api";
import React, {useState, useCallback, useEffect} from 'react';
import {Button, Card, CardBody} from "@nextui-org/react";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {Spacer} from "@nextui-org/spacer";
import {Kbd} from "@nextui-org/kbd";
import {Chip} from "@nextui-org/chip";

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
    mapId: '698509b3153e46a5',
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
    mapTypeControl: true,
    fullscreenControl: false
};

const baseRates: { [key: string]: { [key: string]: number } } = {
    "Local": {
        "Small": 26.80,
        "Medium": 33.50,
        "Large": 25.50,
        "Extra Large": 29.50
    },
    "Cross Border": {
        "Small": 80.40,
        "Medium": 100.50,
        "Large": 120.60,
        "Extra Large": 150.75
    }
};
const sizeMap: { [key: string]: string } = {
    "S": "Small",
    "M": "Medium",
    "L": "Large",
    "XL": "Extra Large"
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
                    // Clear the search box after setting the marker
                    const inputElement = document.querySelector('.searchbox-input') as HTMLInputElement;
                    if (inputElement) {
                        inputElement.value = '';  // Clear the input field
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
                        console.log('Distance calculated:', distanceText);
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
            const baseRate = baseRates[selected][sizeMap[selectedButton]];
            if (baseRate) {
                // Remove commas from the distance string
                const distanceValue = parseFloat(distance.replace(/,/g, '').replace(' km', ''));
                const price = baseRate * distanceValue;
                console.log('Estimated price calculated:', price);
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
            // map.setOptions({
            //     styles: [
            //         {
            //             featureType: 'all',
            //             elementType: 'labels',
            //             stylers: [
            //                 { visibility: 'on' }
            //             ]
            //         }
            //     ]
            // });
        }
    }, [map]);

    const clearMarkers = () => {
        setMarkers([]);
        setDistance(null);
        setEstimatedPrice(null);
    };

    return (
        <div className="text-black items-center flex flex-col gap-4 w-full max-h-fit bg-[#D8EFD3]">
            <Spacer y={16}/>

            <h2 className="font-bold text-4xl mb-4">Pricing Perfection</h2>
            <p className="text-balance text-center w-fit md:w-2/3 text-3xl">
                Find out the average shipping rate for your items and experience pricing perfection     .

                <span className="text-base text-gray-400 md:text-3xl md:text-black">
        Enter a location in the search bar or select one directly on the map below.
    </span>
            </p>

            {/*<p className="text-medium text-balance text-center w-fit md:w-2/3 ">*/}
            {/*    Enter a location in the search bar or select one directly on the map below.*/}
            {/*</p>*/}
            <Spacer y={5}/>
            <div className="flex justify-center w-full">
                <div className="max-w-fit max-h-fit">
                    <div className="flex flex-col row-end-2 w-full flex-wrap md:flex-nowrap gap-4">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
                            <div className="place-items-center flex w-full md:w-auto flex-1 justify-between gap-2">
                                <Card className="text-black">
                                    <CardBody>
                                        <p>Package size :</p>
                                    </CardBody>
                                </Card>
                                {["L", "XL"].map((size) => (
                                    <Button
                                        key={size}
                                        isIconOnly
                                        style={{
                                            backgroundColor: selectedButton === size ? "#7ABA78" : "transparent",
                                            color: selectedButton === size ? "#fff" : "#000"
                                        }}
                                        aria-label={size}
                                        className={`ring-2 ${selectedButton === size ? "ring-indigo-500" : ""}`}
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
                                        {selected}
                                        <br/>
                                        Package Size: {selectedButton}
                                        <br/>
                                        From: {markers[0]?.name || 'N/A'}
                                        <br/>
                                        To: {markers[1]?.name || 'N/A'}
                                        <br/>
                                        Estimated
                                        Price: {estimatedPrice !== null ? `N$${estimatedPrice.toFixed(2)}` : 'N/A'}
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
                                <input
                                    type="text"
                                    placeholder="Type in place name here..."
                                    className="searchbox-input text-black p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </StandaloneSearchBox>

                            <button
                                onClick={clearMarkers}
                                className="w-fit p-2 bg-red-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Clear Markers
                            </button>
                        </div>
                    </div>


                </div>

            </div>

            <p className="text-center text-balance  md:w-2/3 text-medium text-red-600">Disclaimer: The
                prices provided on this website are estimates and may vary based on specific details and
                requirements. For accurate pricing and further information, please contact us directly.
            </p>

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
                            <Marker
                                key={idx}
                                position={position}
                                // @ts-ignore
                                // Use AdvancedMarkerElement for new markers
                                component={google.maps.marker.AdvancedMarkerElement}
                            />
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
                                        console.log('Distance from callback:', distanceText);
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
