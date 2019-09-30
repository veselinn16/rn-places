import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlacesDetailsScreen = props => {
  return (
    <View>
      <Text>Place Details Screen</Text>
    </View>
  );
};

PlacesDetailsScreen.navigtaionOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("placeTitle")
  };
};

const styles = StyleSheet.create({});

export default PlacesDetailsScreen;
