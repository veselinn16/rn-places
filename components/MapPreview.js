import React from "react";
import { Image, StyleSheet } from "react-native";

import ENV from "../env";

const MapPreview = ({ location }) => {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat}, ${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`;
};

const styles = StyleSheet.create({});

export default MapPreview;
