import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Platform
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { ImagePicker } from "expo";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import Ionicons from "@expo/vector-icons/Ionicons";

import { CATextInput, CAButton } from "../components";
import { Colors, Urls } from "../constants";

class ContactFormScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            gender: "",
            avatar: ""
          }}
          validationSchema={yup.object().shape({
            first_name: yup.string().required(),
            last_name: yup.string().required(),
            email: yup
              .string()
              .email()
              .required(),
            gender: yup.string().required()
            // avatar: yup.required()
          })}
          onSubmit={this._handleSave}
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
              <View>
                <TouchableOpacity
                  style={{
                    alignItems: "center",

                    padding: 8
                  }}
                  onPress={this._handlePickImage}
                >
                  <ImageBackground
                    source={{
                      uri:
                        this.state.avatar !== ""
                          ? this.state.avatar.uri
                          : "https://www.colorcombos.com/images/colors/FFFFFF.png"
                    }}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 18,

                      backgroundColor: Colors.light,

                      borderColor: Colors.gray,
                      borderWidth: 1,
                      borderRadius: 100
                    }}
                    imageStyle={{
                      borderRadius: 100
                    }}
                  >
                    <Ionicons
                      name="md-camera"
                      size={24}
                      color={Colors.primary}
                    />
                  </ImageBackground>
                  <Text
                    style={[
                      { marginTop: 4 },
                      touched.avatar && errors.avatar && { color: "red" }
                    ]}
                  >
                    Pick Avatar
                  </Text>
                </TouchableOpacity>

                <View style={styles.sectionMain}>
                  <CATextInput
                    labelText="First Name"
                    value={values.first_name}
                    error={touched.first_name && errors.first_name && true}
                    onChangeText={handleChange("first_name")}
                    onBlur={() => setFieldTouched("first_name")}
                  />

                  <CATextInput
                    labelText="Last Name"
                    addStyle={{ marginTop: 16 }}
                    value={values.last_name}
                    error={touched.last_name && errors.last_name && true}
                    onChangeText={handleChange("last_name")}
                    onBlur={() => setFieldTouched("last_name")}
                  />

                  <CATextInput
                    labelText="Email"
                    addStyle={{ marginTop: 16 }}
                    value={values.email}
                    error={touched.email && errors.email && true}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                  />

                  <RadioForm formHorizontal={true}>
                    {[
                      { label: "MALE", value: 0 },
                      { label: "FEMALE", value: 1 }
                    ].map((obj, i) => {
                      return (
                        <RadioButton labelHorizontal={true} key={i}>
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.gender === i}
                            onPress={value => {
                              this.setState({ gender: value });
                              values.gender = value;
                            }}
                            borderWidth={1}
                            buttonInnerColor={Colors.primary}
                            buttonOuterColor={Colors.primary}
                            buttonSize={8}
                            buttonOuterSize={20}
                            buttonWrapStyle={{ marginTop: 16 }}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={value => {
                              this.setState({ gender: value });
                              values.gender = value;
                            }}
                            labelStyle={
                              touched.gender &&
                              errors.gender && { color: "red" }
                            }
                            labelWrapStyle={{
                              marginTop: 16,
                              marginLeft: 2,
                              marginRight: 16
                            }}
                          />
                        </RadioButton>
                      );
                    })}
                  </RadioForm>
                </View>
              </View>

              <CAButton buttonText="Save Data" block onPress={handleSubmit} />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }

  state = {
    gender: "",
    avatar: ""
  };

  _handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ avatar: result });
    }
  };

  _handleSave = async data => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { first_name, last_name, email, gender } = data;
      const { avatar } = this.state;

      const url = `${Urls.base}/${Urls.contactsDir}?token=${token}`;

      fetch(url, {
        method: "POST",
        headers: {
          // Accept: "application/json",
          //   "Content-Type": "application/json"
          "Content-Type": "x-www-form-urlencoded"
        },
        body: this._createFormData(avatar, {
          first_name: first_name,
          last_name: last_name,
          email: email,
          gender: gender
        })
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          json.error
            ? ToastAndroid.show(json.error, ToastAndroid.SHORT)
            : console.log(json);
        });
    } catch (error) {}
  };

  _createFormData = (photo, body) => {
    const data = new FormData();

    // console.log(photo);

    data.append("avatar", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",

    padding: 16
  },
  sectionMain: {
    display: "flex",
    justifyContent: "center",

    marginBottom: 32
  }
});

export default ContactFormScreen;
