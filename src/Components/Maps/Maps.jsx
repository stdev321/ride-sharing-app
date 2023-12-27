import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { mapStyle } from '../../StyleObjects/MapStyle';
import * as Location from 'expo-location';

const Maps = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [lati, setLati] = useState(null);
    const [longi, setLongi] = useState(null);
    const [heading, setHeading] = useState(null)
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get the initial location
            let initialLocation = await Location.getCurrentPositionAsync({});
            setLocation(initialLocation);

            // Subscribe to location updates
            const locationSubscription = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, timeInterval: 1000 },
                (newLocation) => {
                    setLocation(newLocation);
                    setLati(newLocation.coords.latitude);
                    setLongi(newLocation.coords.longitude);
                    setHeading(newLocation.coords.heading)
                }
            );

            return () => {
                // Unsubscribe from location updates when the component unmounts
                if (locationSubscription) {
                    locationSubscription.remove();
                }
            };
        })();
    }, []);

    return (
        <>
            <View style={{ flex: 1 }}>
                {lati !== null && longi !== null ?
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: (lati + 30.742162) / 2,
                            longitude: (longi + 76.778599) / 2,
                            latitudeDelta: Math.abs(lati - 30.742162) + 0.05,
                            longitudeDelta: Math.abs(longi - 76.778599) + 0.05,
                        }}
                        customMapStyle={mapStyle}
                        maxZoomLevel={15}
                        minZoomLevel={10}
                        maxDelta={0.08}
                    >
                        <Polyline
                            coordinates={[
                                { latitude: lati, longitude: longi },
                                { latitude: 30.742162, longitude: 76.778599 },
                            ]}
                            strokeWidth={3}
                            strokeColor="white"
                        />

                        <Marker
                            key={1}
                            coordinate={{ latitude: lati, longitude: longi }}
                            title={"Demo"}
                            description={"Demo For Testing"}
                            icon={require('../../../assets/carpin1.png')}
                            rotation={heading}
                        />
                        <Marker
                            key={2}
                            coordinate={{ latitude: 30.742162, longitude: 76.778599 }}
                            title={"Demo"}
                            description={"Demo For Testing"}
                        // image={require('../../../assets/carpin1.png')}
                        // rotation={heading}
                        />
                    </MapView>
                    : null}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Maps;
