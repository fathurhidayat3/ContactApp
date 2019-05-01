import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import { CAButton, CATextInput } from "../components";
import { Colors, Urls } from "../constants";

class LoginScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Contact Application</Text>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={yup.object().shape({
            username: yup.string().required(),
            password: yup.string().required()
          })}
          onSubmit={this._handleLogin}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            setFieldTouched,
            handleSubmit
          }) => (
            <Fragment>
              <View style={styles.sectionMain}>
                <CATextInput
                  labelText="Username"
                  value={values.username}
                  error={touched.username && errors.username && true}
                  onChangeText={handleChange("username")}
                  onBlur={() => setFieldTouched("username")}
                />

                <CATextInput
                  labelText="Password"
                  type="password"
                  addStyle={{ marginTop: 16 }}
                  value={values.password}
                  error={touched.password && errors.password && true}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                />
              </View>
              <CAButton
                buttonText="Login"
                rounded
                block
                onPress={handleSubmit}
              />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }

  state = {};

  _handleLogin = data => {
    const { username, password } = data;

    fetch(`${Urls.base}/${Urls.authDir}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        json.error
          ? ToastAndroid.show(json.error, ToastAndroid.SHORT)
          : AsyncStorage.setItem("token", json.token).then(() => {
              this.props.navigation.navigate("ContactList");
            });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",

    padding: 16
  },
  sectionMain: {
    display: "flex",
    justifyContent: "center",

    marginVertical: 32
  },
  headerText: {
    fontSize: 36,
    fontFamily: "nunito--extra-bold",
    color: Colors.primary,
    textAlign: "center"
  }
});

export default LoginScreen;
