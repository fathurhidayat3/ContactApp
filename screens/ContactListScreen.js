import React, { Component } from "react";
import { StyleSheet, View, ToastAndroid, AsyncStorage } from "react-native";

import { CAListItem, CAButton } from "../components";
import { Layout, Urls } from "../constants";

class ContactListScreen extends Component {
  render() {
    const { nextPage, prevPage } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.sectionListItem}>
          {this._paginateContacts().data.map((listItem, index) => {
            return (
              <CAListItem
                imageUri={listItem.avatar}
                topText={`${listItem.first_name} - ${listItem.last_name}`}
                middleText={listItem.gender}
                bottomText={listItem.email}
                addStyle={{ marginBottom: 16 }}
                onPress={e => this._handleListItemPress(e, listItem.first_name)}
                key={index}
              />
            );
          })}
        </View>
        <View style={styles.sectionToolbox}>
          <View style={styles.toolboxWrapper}>
            <CAButton
              buttonText="Previous"
              addStyle={prevPage ? { opacity: 1 } : { opacity: 0 }}
              disabled={prevPage ? false : true}
              onPress={this._handlePrevPage}
            />
            <CAButton
              buttonText="Next"
              addStyle={nextPage ? { opacity: 1 } : { opacity: 0 }}
              disabled={nextPage ? false : true}
              onPress={this._handleNextPage}
            />
          </View>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
  }

  state = {
    contacts: [],
    currentPage: 1,
    pageLimit: 0,
    prevPage: false,
    nextPage: true
  };

  componentDidMount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const url = `${Urls.base}/${Urls.contactsDir}?token=${token}`;

      if (token !== null) {
        fetch(url, {
          method: "GET"
        })
          .then(response => response.json())
          .then(json => {
            if (json.error) {
              this.props.navigation.navigate("Auth");
            } else {
              this._getPageLimit();

              this.setState({
                contacts: json.data
              });
            }
          });
      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  _handleListItemPress = (e, name) => {
    ToastAndroid.show(`Hello I'm ${name}`, ToastAndroid.SHORT);
  };

  _handlePrevPage = async () => {
    await this.setState(state => ({
      currentPage: state.currentPage - 1
    }));

    this.state.currentPage > 1
      ? this.setState({
          nextPage: true,
          prevPage: true
        })
      : this.setState({
          prevPage: false
        });
  };

  _handleNextPage = async () => {
    await this.setState(state => ({
      currentPage: state.currentPage + 1
    }));

    this.state.currentPage < this._getPageLength()
      ? this.setState({
          nextPage: true,
          prevPage: true
        })
      : this.setState({
          nextPage: false
        });
  };

  _getPageLimit = () => {
    let contentHeight = Layout.window.height;

    switch (true) {
      case 0 <= contentHeight && contentHeight < 640:
        this.setState({ pageLimit: 3 });
        break;
      case 640 <= contentHeight:
        this.setState({ pageLimit: 4 });
        break;
      default:
        this.setState({ pageLimit: 5 });
        break;
    }
  };

  _getPageLength = () =>
    Math.ceil(this.state.contacts.length / this.state.pageLimit);

  _paginateContacts = () => {
    let { contacts, currentPage, pageLimit } = this.state;

    let offset = pageLimit * (currentPage - 1);

    let sliced = contacts.slice(offset, offset + pageLimit);

    return {
      data: sliced
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    height: Layout.window.height,

    padding: 16
  },
  sectionListItem: {
    flex: 1
  },
  sectionToolbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    height: 40
  },
  toolboxWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default ContactListScreen;
