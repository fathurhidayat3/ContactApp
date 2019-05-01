import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  View,
  Keyboard
} from "react-native";

import { Colors } from "../constants";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      Keyboard.dismiss();

      this.props.navigation.navigate("Home");
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AuthLoadingScreen;
