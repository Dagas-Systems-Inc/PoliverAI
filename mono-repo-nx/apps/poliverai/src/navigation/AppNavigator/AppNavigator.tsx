import React from 'react';
import { ActivityIndicator, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, PolicyAnalysisScreen, ReportsScreen } from '../../screens';
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import { TabNavigator } from '../TabNavigator/TabNavigator';
import { LandingScreen } from '../../screens/LandingScreen';
import CreditsScreen from '../../screens/CreditsScreen';

const Stack = createStackNavigator();

const navigationTheme = {
  dark: false,
  colors: {
    primary: '#2563eb',
    background: '#ffffff',
    card: '#ffffff',
    text: '#0f172a',
    border: '#e2e8f0',
    notification: '#2563eb',
  },
};

export const AppNavigator = ({
  initialPlatform,
  isAuthenticated,
  isLoading,
}: {
  initialPlatform?: string;
  // Accept auth state from the caller to avoid importing useAuth here and creating a circular dependency.
  isAuthenticated?: boolean;
  isLoading?: boolean;
} = {}) => {
  // If parent didn't provide auth state, default to not loading and not authenticated to avoid blocking rendering.
  // Prefer passing real auth state from the app root to this navigator to preserve behavior.
  const loading = isLoading ?? false;
  const authenticated = isAuthenticated ?? false;

  const handleReady = React.useCallback(() => {
    if (Platform.OS === 'web') {
      return;
    }

    try {
      // Hide the native launch screen only after navigation is mounted so
      // Android does not flash a blank intermediate frame.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const BootSplash = require('react-native-bootsplash').default;
      setTimeout(() => {
        BootSplash.hide({ fade: true }).catch(() => undefined);
      }, 50);
    } catch (_) {
      // Ignore when the native module is unavailable in test/web contexts.
    }
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', gap: 12 }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ color: '#475569', fontSize: 16, fontWeight: '600' }}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      onReady={handleReady}
      theme={navigationTheme}
      linking={
        // Basic web linking configuration so paths map to the intended screens
        // - '/': LandingScreen
        // - '/login': LoginScreen
        // - '/register' and '/signup': RegisterScreen
        // - '/dashboard': HomeScreen (dashboard)
        {
          prefixes: [
            typeof window !== 'undefined' ? window.location.origin : 'app://',
            'poliverai://',
          ],
          config: {
            screens: {
              WebLanding: '',
              Login: 'login',
              Register: 'register',
              Signup: 'signup',
              Dashboard: 'dashboard',
              Analyze: 'analyze',
              Reports: 'reports',
              Credits: 'credits',
              PaymentReturn: 'payments/return',
              Main: {
                path: 'app',
              },
            },
          },
        }
      }
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' },
        }}
        initialRouteName={authenticated ? 'Main' : 'WebLanding'}
      >
        {/* Always include the key web routes as screens so the linking config can navigate to them */}
        <Stack.Screen name="WebLanding" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Analyze" component={PolicyAnalysisScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="Credits" component={CreditsScreen} />
        <Stack.Screen name="PaymentReturn" component={CreditsScreen} />
        {authenticated ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
