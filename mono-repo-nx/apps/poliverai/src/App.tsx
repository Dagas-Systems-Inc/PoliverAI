import React from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingScreen from './screens/LandingScreen/LandingScreen';

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

function NativeRoot() {
  console.error('[startup] NativeRoot render');

  React.useEffect(() => {
    console.error('[startup] NativeRoot effect: hide BootSplash start');
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const BootSplash = require('react-native-bootsplash').default;
      BootSplash.hide({ fade: true })
        .then(() => console.error('[startup] NativeRoot effect: hide BootSplash success'))
        .catch((error: unknown) => console.error('[startup] NativeRoot effect: hide BootSplash failed', error));
    } catch (_) {
      // Ignore if native module is unavailable in this runtime.
      console.error('[startup] NativeRoot effect: react-native-bootsplash require failed');
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={{ flex: 1, backgroundColor: '#fffbeb' }}>
        <View
          style={{
            margin: 16,
            padding: 16,
            borderRadius: 16,
            backgroundColor: '#f97316',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '800' }}>
            Native root is rendering
          </Text>
          <Text style={{ color: '#fff7ed', marginTop: 8, fontSize: 15 }}>
            If you can read this, the black screen is not coming from Metro.
          </Text>
        </View>
        <LandingScreen />
      </View>
    </SafeAreaProvider>
  );
}

export const App = () => {
  console.error('[startup] App root render', { platform: Platform.OS });

  if (Platform.OS !== 'web') {
    console.error('[startup] App root -> NativeRoot');
    return <NativeRoot />;
  }

  const { AuthProvider, useAuth } = require('@poliverai/intl');
  const { AppNavigator } = require('./navigation');

  function AppContent() {
    const { isAuthenticated, loading } = useAuth();
    const initialPlatform = 'web';
    console.error('[startup] AppContent render', {
      platform: Platform.OS,
      isAuthenticated,
      loading,
      initialPlatform,
    });

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <PlatformGreeting />
        <AppNavigator initialPlatform={initialPlatform} isAuthenticated={isAuthenticated} isLoading={loading} />
      </>
    );
  }

  console.error('[startup] App root -> web AuthProvider path');
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
