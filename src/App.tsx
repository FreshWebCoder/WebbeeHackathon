import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';

import Navigator from './Navigator';
import store, { persistor } from './store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
);

export default App;
