import React, { useState, useEffect } from "React";

import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "../components/MapPreview";

const LocationPicker = ({ navigation, onLocationPicked }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const mapPickedLocation = navigation.getParam("pickedLocation");

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const answer = await Permissions.askAsync(Permissions.LOCATION);

    if (answer.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location from the map",
        [{ text: "Okay" }]
      );
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default LocationPicker;
