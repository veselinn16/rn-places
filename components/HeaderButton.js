import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import Colors from "../constants/Colors";

const CustomHaederButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "#fff" : Colors.primary}
    />
  );
};

export default CustomHaederButton;
