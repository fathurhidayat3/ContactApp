import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

import { Colors, Fonts } from "../constants";
import CAButtonIcon from "./CAButtonIcon";

const CAHeader = props => {
  const {
    addStyle,
    title,
    leftIconName,
    rightIconName,
    leftButton,
    rightButton,
    leftButtonOnPress,
    rightButtonOnPress
  } = props;

  return (
    <View style={[styles.container, addStyle]}>
      <View style={styles.buttonWrapper}>
        {leftButton ? (
          <CAButtonIcon iconName={leftIconName} onPress={leftButtonOnPress} />
        ) : null}
      </View>

      <Text style={styles.titleText}>{title}</Text>

      <View style={styles.buttonWrapper}>
        {rightButton ? (
          <CAButtonIcon iconName={rightIconName} onPress={rightButtonOnPress} />
        ) : null}
      </View>
    </View>
  );
};

CAHeader.defaultProps = {
  leftIconName: "md-menu",
  rightIconName: "md-add",
  leftButton: true,
  rightButton: true
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    height: 50,

    borderBottomColor: Colors.gray,
    borderBottomWidth: 1
  },
  titleText: {
    flex: 1,

    fontSize: Fonts.size.big,
    fontFamily: "nunito--extra-bold",
    color: Colors.primary,
    textAlign: "center"
  },
  buttonWrapper: {
    width: 50
  }
});

export default CAHeader;
