import React from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation';
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
  const initialPlatform = Platform.OS === 'web' ? 'web' : 'native';
  console.error('[startup] AppContent render', {
    platform: Platform.OS,
    isAuthenticated,
    loading,
    initialPlatform,
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <PlatformGreeting />
      <AppNavigator initialPlatform={initialPlatform} isAuthenticated={isAuthenticated} isLoading={loading} />
    </>
  );
}

export const App = () => {
  console.error('[startup] App root render', { platform: Platform.OS });
  console.error('[startup] App root -> AuthProvider path');
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
