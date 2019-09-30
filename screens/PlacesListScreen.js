import React from "react";
import { FlatList, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector(state => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          onSelect={() => {
            navigation.navigate("PlaceDetails", {
              placeTitle: item.title,
              placeId: item.id
            });
          }}
          image={null}
          address={null}
          title={item.title}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate("NewPlace")}
        />
      </HeaderButtons>
    )
  };
};

export default PlacesListScreen;
