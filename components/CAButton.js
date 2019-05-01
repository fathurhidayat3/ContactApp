import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { Colors } from "../constants";

const CAButton = props => {
  const { rounded, invert, block, addStyle, buttonText } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        rounded && styles.btnRounded,
        invert && styles.btnInvert,
        block && styles.btnBlock,
        addStyle
      ]}
      {...props}
    >
      <Text style={[styles.buttonText, invert && styles.btnInvertText]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",

    paddingVertical: 8,
    paddingHorizontal: 20,

    backgroundColor: Colors.primary,

    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4
  },
  buttonText: {
    color: Colors.light
  },
  btnRounded: {
    borderRadius: 100
  },
  btnInvert: {
    backgroundColor: Colors.light
  },
  btnInvertText: {
    color: Colors.primary
  },
  btnBlock: {
    width: "100%"
  }
});

export default CAButton;
