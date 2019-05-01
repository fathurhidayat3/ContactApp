import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import { Colors } from "../constants";

const CATextInput = props => {
  const { type, error, addStyle, labelText } = props;

  return (
    <View style={[styles.container, addStyle]}>
      <Text style={[error && styles.labelError]}>{labelText}</Text>
      <TextInput
        secureTextEntry={type === "password" && true}
        selectionColor={Colors.primary}
        style={[styles.inputText, error && styles.inputError]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  inputText: {
    marginTop: 4,
    paddingHorizontal: 8,

    height: 40,

    backgroundColor: Colors.light,

    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 4
  },
  inputError: {
    borderColor: "red"
  },
  labelError: {
    color: "red"
  }
});

export default CATextInput;
