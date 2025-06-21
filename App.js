import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/redux/store';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const linking = {
  prefixes: ['zaddymobile://'],
  config: {
    screens: {
      RecommendedScreen: 'face-scan-finished',
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer linking={linking}>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <AppNavigator />
            <Toast />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
