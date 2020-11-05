import React , {useState , useEffect} from 'react';
import {AsyncStorage, View , Platform , } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';
import * as Permissions from "expo-permissions";
import { Notifications, AppLoading } from 'expo';

function App({navigation}) {

  const [isReady, setIsReady] = useState(false);

  useEffect( () => {
    // I18nManager.forceRTL(true);
    // AsyncStorage.clear()

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('orders', {
        name: 'Chat messages',
        sound: true,
      });
    }

    async function loadFont(){
      await Font.loadAsync({
        FairuzBlack             : require('./assets/fonts/Fairuz-Black.otf'),
        FairuzBold              : require('./assets/fonts/Fairuz-Bold.otf'),
        FairuzLight             : require('./assets/fonts/Fairuz-Light.otf'),
        FairuzNormal            : require('./assets/fonts/Fairuz-Normal.otf'),
        Roboto                  : require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium           : require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
    });
      setIsReady(true)
    }
    loadFont();

  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Root>
            <AppNavigator />
          </Root>
        </PersistGate>
      </Provider>
  );
}


export default App;
