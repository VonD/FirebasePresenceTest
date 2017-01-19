/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCJV6dO5DLp9ynqEgrXM41-A-ymJS8gBmM",
  authDomain: "p-playground.firebaseapp.com",
  databaseURL: "https://p-playground.firebaseio.com",
  storageBucket: "p-playground.appspot.com",
  messagingSenderId: "303420153696"
});

const database = firebase.database();
firebase.database.enableLogging(true);

export default class FirebasePresenceTest extends Component {
  componentWillMount() {
    console.log('Attaching presence event listener');
    database.ref('.info/connected').on('value', snapshot => {
      console.log(`Connected to Firebase: ${ snapshot.val() }`);
    });
    console.log('Attaching data event listener');
    database.ref('test').on('value', snapshot => {
      console.log(`Test data: ${ snapshot.val() }`);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FirebasePresenceTest', () => FirebasePresenceTest);
