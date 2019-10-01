import React, { useState } from "react";
import { View, Button, Text, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";

const ImgPicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const answer = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

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

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={styles.ImagePicker}>
      <View style={styles.ImagePreview}>
        {!pickedImage ? (
          <Text>No image picked.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
        <Button
          title="Take image"
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ImagePicker: {
    alignItems: "center",
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 4
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default ImgPicker;
