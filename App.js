import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { bootstrap } from './src/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { MainDrawer } from './src/navigation/AppNavigation'

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}

