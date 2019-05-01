import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import { Colors, Fonts } from "../constants";

const CAListItem = props => {
  const { imageUri, topText, middleText, bottomText, addStyle } = props;

  return (
    <TouchableOpacity style={[styles.container, addStyle]} {...props}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: imageUri
          }}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.topText}
        numberOfLines={1}>{topText}</Text>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1}>{middleText}</Text>
          <Text numberOfLines={1} style={styles.bottomText}>{bottomText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",

    padding: 12,

    height: 105,

    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 4
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    height: 75,
    width: 75,

    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 100
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",

    paddingLeft: 16
  },
  textWrapper: {
    marginTop: 4
  },
  topText: {
    fontSize: Fonts.size.normal,
    fontFamily: "nunito--extra-bold",
    color: Colors.primary
  },
  bottomText: {
    color: Colors.accent
  }
});

export default CAListItem;
