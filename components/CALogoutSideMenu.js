import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { DrawerItems } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

class CALogoutSideMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <DrawerItems {...this.props} />
          <TouchableOpacity
            style={styles.logoutWrapper}
            onPress={this._handleLogout}
          >
            <Ionicons name="md-power" size={24} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  _handleLogout = async () => {
    await AsyncStorage.removeItem("token").then(() => {
      this.props.navigation.navigate("Auth");
    });
  };
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoutWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 8,
    paddingHorizontal: 16
  },
  logoutText: {
    flex: 1,
    marginLeft: 36,

    fontWeight: "bold"
  }
});

export default CALogoutSideMenu;
