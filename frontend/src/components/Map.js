import React, { useState, useMemo} from 'react';
import { Card } from 'react-bootstrap';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import L from 'leaflet';
import anchorSvg from "@fortawesome/fontawesome-free/svgs/solid/anchor.svg";
import 'leaflet/dist/leaflet.css';

const DEFAULT_COORDINATES = [53.07349737058038, 8.805408457483715];

const markerIcon = new L.Icon({
    iconUrl: anchorSvg,
    iconRetinaUrl: anchorSvg,
    iconSize: new L.Point(60, 75),
    className: 'map-marker-icon'
});

const Map = ({ anchorages }) => {
    const centerPosition = useMemo(() => 
        anchorages.length > 0
            ? [anchorages[0].latitude, anchorages[0].longitude]
            : DEFAULT_COORDINATES
    , [anchorages]);

    return (
        <MapContainer style={{height: "600px"}} center={centerPosition} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {anchorages.map((anchorage) => (
                    <Marker
                        key={anchorage.id}
                        title={anchorage.name}
                        position={[ parseFloat(anchorage.latitude), parseFloat(anchorage.longitude)]}
                        icon={markerIcon}
                    >
                        <Popup>
                            <Card.Body>
                                <Card.Title className="mb-4">{anchorage.name}</Card.Title>
                                <Card.Text>
                                    <i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {anchorage.location}
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-globe"></i> <strong>Latitude:</strong> {anchorage.latitude}
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-globe"></i> <strong>Longitude:</strong> {anchorage.longitude}
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-water"></i> <strong>Depth:</strong> {anchorage.depth} m
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-info-circle"></i> <strong>Seabed Type:</strong> {anchorage.seabed_type}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Description:</strong> {anchorage.description}
                                </Card.Text>
                            </Card.Body>
                        </Popup>
                    </Marker>
                ))}
            
            <Marker position={[51.505, -0.09]} icon={markerIcon}>
            </Marker>
        </MapContainer>
    );
};

//export default React.memo(Map);
export default Map;