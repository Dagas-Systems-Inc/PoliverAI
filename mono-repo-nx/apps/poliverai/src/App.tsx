import React, { useState } from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation';
import { Splash } from '@poliverai/shared-ui';
import { AuthProvider, useAuth } from '@poliverai/intl';

// Minimal PlatformGreeting replacement to avoid importing from shared-ui.
const PlatformGreeting: React.FC = () => {
  if (Platform.OS === 'web') {
    return null;
  }
  return (
    <View style={{ padding: 8 }}>
      <Text>Welcome to PoliverAI</Text>
    </View>
  );
};


function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(Platform.OS !== 'web');
  const initialPlatform = Platform.OS === 'web' ? 'web' : 'native';

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PlatformGreeting />
      {showSplash ? (
        <Splash
          onFinish={() => {
            setShowSplash(false);
          }}
        />
      ) : (
        <AppNavigator initialPlatform={initialPlatform} isAuthenticated={isAuthenticated} isLoading={loading} />
      )}
    </>
  );
}

export const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
