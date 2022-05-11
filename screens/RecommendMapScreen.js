import React from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Mapstyle from './Mapstyle';

function RecommendMapScreen() {
  const route = useRoute();
  const locations = route.params;

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
              image={require('../assets/dot.png')}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}
export default RecommendMapScreen;
