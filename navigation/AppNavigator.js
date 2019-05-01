import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import {
  AuthLoadingScreen,
  LoginScreen,
  ContactListScreen,
  ContactFormScreen
} from "../screens";
import { CAHeader, CALogoutSideMenu } from "../components";
import { Colors } from "../constants";

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
});

const ContactListStack = createStackNavigator({
  ContactList: {
    screen: ContactListScreen,
    navigationOptions: {
      header: ({ navigation }) => {
        return (
          <CAHeader
            title="Contact List"
            leftButtonOnPress={() => navigation.toggleDrawer()}
            rightButtonOnPress={() => navigation.navigate("ContactForm")}
          />
        );
      }
    }
  },
  ContactForm: {
    screen: ContactFormScreen,
    navigationOptions: {
      header: ({ navigation }) => {
        return (
          <CAHeader
            title="Create Contact"
            leftIconName="md-arrow-back"
            leftButtonOnPress={() => navigation.popToTop()}
            rightButton={false}
          />
        );
      }
    }
  }
});

const HomeDrawer = createDrawerNavigator(
  {
    ContactListStack: {
      name: "ContactListStack",
      screen: ContactListStack,
      navigationOptions: {
        drawerLabel: "Contact List",
        drawerIcon: () => (
          <Ionicons name="md-book" size={24} color={Colors.primary} />
        )
      }
    }
  },
  {
    contentComponent: props => <CALogoutSideMenu {...props} />,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      Home: HomeDrawer
    },
    {
      // initialRouteName: "Home"
    }
  )
);
