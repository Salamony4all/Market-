'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Fix for default marker icons in Leaflet + Next.js
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const locations = [
    { id: 1, name: 'Muscat (Yiti) - Nikki Beach', coords: [23.5147, 58.7562], type: 'Hospitality', score: 150 },
    { id: 2, name: 'Salalah Airport T3', coords: [17.0454, 54.0886], type: 'Infrastructure', score: 60 },
    { id: 3, name: 'Duqm Refinery Housing', coords: [19.6738, 57.6534], type: 'Residential', score: 90 },
    { id: 4, name: 'Sohar Industrial Estate', coords: [24.3461, 56.6322], type: 'Industrial', score: 45 },
];

export default function MuscatMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="h-full w-full bg-slate-50 animate-pulse"></div>;

    return (
        <MapContainer
            center={[21.0, 57.0]}
            zoom={6}
            style={{ height: '100%', width: '100%', background: '#f8fafc' }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {locations.map((loc) => (
                <Marker key={loc.id} position={loc.coords as [number, number]} icon={icon}>
                    <Popup className="custom-popup">
                        <div className="p-2">
                            <h3 className="font-bold text-sm">{loc.name}</h3>
                            <p className="text-xs text-primary">Score: {loc.score}</p>
                            <p className="text-[10px] text-gray-500 uppercase">{loc.type}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
