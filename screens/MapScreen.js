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
  const initialLocation = navigation.getParam("initialLocation");
  const readonly = navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocation = event => {
    if (readonly) return;
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

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocation}>
      {markerCoordinates && <Marker coordinate={markerCoordinates} />}
    </MapView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => {
  const saveFn = navigation.getParam("saveLocation");
  const readonly = navigation.getParam("readonly");

  if (readonly) return {};

  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

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
