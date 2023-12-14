import React, { useEffect } from 'react'
import DrawerNavigatior from './src/Navigation/DrawerNavigatior'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './src/Storage/Store';
import DynamicLinkHandler from './src/Utils/DynamicLinkHandler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import color from './src/Utils/Color';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.black, // Change this to the color you want for the active placeholder
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <DynamicLinkHandler />
          <DrawerNavigatior />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

export default App