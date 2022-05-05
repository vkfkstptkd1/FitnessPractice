import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {View} from 'react-native';
import Mapstyle from './Mapstyle';
import CameraButton from '../components/CameraButton';

function TrackScreen() {
  const [locations, setLocations] = useState([]);
  let watchId;

  useEffect(() => {
    watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocations([...locations, {latitude, longitude}]);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 50000,
        fastestInterval: 2000,
      },
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [locations]);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {locations.length > 0 && (
        <MapView
          style={{flex: 1}}
          customMapStyle={Mapstyle}
          initialRegion={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {locations.map((location, index) => (
            <Marker
              key={`location-${index}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          ))}
        </MapView>
      )}
      <CameraButton text={"Upload"} icon={'check'} />
    </View>
  );
}

export default TrackScreen;