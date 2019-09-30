import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import MapScreen from "../screens/MapScreen";

import Colors from "../constants/Colors";

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetails: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary
    }
  }
);

export default createAppContainer(PlacesNavigator);
