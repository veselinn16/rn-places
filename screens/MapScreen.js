import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  const selectLocation = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocation = useCallback(() => {
    if (!selectLocation) {
      Alert.alert("Something went wrong!", "There is no location set", [
        { text: "Okay" }
      ]);
      return;
    }
    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: savePickedLocation });
  }, [savePickedLocation]);

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocation}>
      {markerCoordinates && <Marker coordinate={markerCoordinates} />}
    </MapView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={navigation.getParam("saveLocation")}
    >
      <Text style={styles.headerButtonText}>Save</Text>
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "#fff" : Colors.primary
  }
});

export default MapScreen;
