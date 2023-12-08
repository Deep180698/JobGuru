import React, { Component } from 'react';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { navigate } from './DynamicLinkNavService';

class DynamicLinkHandler extends Component {

  async componentDidMount() {
    console.log("11111");
    
      setTimeout(() => {
        this.handleDynamicLinks();
      }, 5000);
    
    // else{
    //   setTimeout(() => {
    //     navigate('PhoneNumberInput')
    //   }, 3000);
     
    // }
  }

  handleDynamicLinks = async () => {
    const initialLink = await dynamicLinks().getInitialLink();
    this.handleLink(initialLink);
    console.log("link",initialLink);

    const unsubscribe = dynamicLinks().onLink((link: FirebaseDynamicLinksTypes.DynamicLink) => {
      this.handleLink(link);

    });
    return unsubscribe;
  };

  handleLink = async (link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
    if (link) {

      console.log("link",link);
      
      // Process the dynamic link here based on your app's logic
     
       
      
    }
  };

  render() {
    // Render your app's UI here
    return null;
  }
}

export default DynamicLinkHandler;