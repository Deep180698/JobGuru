/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from '@react-native-firebase/app';

// Your Firebase project config (from google-services.json)
// const firebaseConfig = {
//   apiKey: 'AIzaSyB8LpNCBP-oy4bZnqP_zCUyo5PvGN2diEc',
//   authDomain: 'jobguru-972cd.firebaseapp.com',
//   databaseURL: 'https://jobguru-972cd.firebaseio.com',
//   projectId: 'jobguru-972cd',
//   storageBucket: 'jobguru-972cd.appspot.com',
//   messagingSenderId: '924849834671',
//   appId: '1:924849834671:android:fcce8eae7145865c56225a',
// };

// // Initialize Firebase
// initializeApp(firebaseConfig,"JobGuru");


AppRegistry.registerComponent(appName, () => App);
