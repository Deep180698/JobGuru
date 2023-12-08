import React,{useEffect} from 'react'
import { PaperProvider } from 'react-native-paper'
import DrawerNavigatior from './src/Navigation/DrawerNavigatior'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './src/Storage/Store';
import DynamicLinkHandler from './src/Utils/DynamicLinkHandler';

const App = () => {
 
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <DynamicLinkHandler />
          <DrawerNavigatior />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

export default App