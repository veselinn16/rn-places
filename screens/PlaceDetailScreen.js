import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailScreen = props => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

PlaceDetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("placeTitle")
});

export default PlaceDetailScreen;
