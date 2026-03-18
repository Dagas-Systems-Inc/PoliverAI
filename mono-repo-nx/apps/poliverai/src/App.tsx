import React from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation';
import { AuthProvider, useAuth } from '@poliverai/intl';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const initialPlatform = Platform.OS === 'web' ? 'web' : 'native';
  console.log('[startup] AppContent render', {
    platform: Platform.OS,
    isAuthenticated,
    loading,
    initialPlatform,
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppNavigator initialPlatform={initialPlatform} isAuthenticated={isAuthenticated} isLoading={loading} />
    </>
  );
}

export const App = () => {
  console.log('[startup] App root render', { platform: Platform.OS });
  console.log('[startup] App root -> AuthProvider path');
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
