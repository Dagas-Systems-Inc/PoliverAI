import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@poliverai/intl';
import { LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react-native';
import PoliveraiLogo from '../../assets/brand/poliverai-logo.svg';

type AppTopNavProps = {
  currentRoute?: 'landing' | 'login' | 'register' | 'dashboard' | 'analyze' | 'credits' | 'reports';
};

export default function AppTopNav({ currentRoute = 'landing' }: AppTopNavProps) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, logout } = useAuth() as unknown as {
    isAuthenticated?: boolean;
    logout?: () => void | Promise<void>;
  };

  const navigate = React.useCallback(
    (routeName: string) => {
      try {
        navigation.navigate(routeName);
      } catch {
        // Ignore navigation failures on startup fallback screens.
      }
    },
    [navigation]
  );

  const handleLogout = React.useCallback(async () => {
    await logout?.();
    navigate('WebLanding');
  }, [logout, navigate]);

  return (
    <View style={[styles.outer, { paddingTop: Math.max(insets.top, 8), minHeight: 56 + insets.top }]}>
      <Pressable onPress={() => navigate('WebLanding')} style={styles.brandButton}>
        <PoliveraiLogo width={112} height={32} />
      </Pressable>

      <View style={styles.actionsRow}>
        {isAuthenticated ? (
          <>
            <Pressable onPress={() => navigate('Dashboard')} style={[styles.actionButton, styles.primaryButton]}>
              <View style={styles.actionButtonInner}>
                <LayoutDashboard size={16} color="#ffffff" />
                <Text style={styles.primaryButtonText}>Dashboard</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleLogout} style={styles.actionButton}>
              <View style={styles.actionButtonInner}>
                <LogOut size={16} color="#0f172a" />
                <Text style={styles.secondaryButtonText}>Logout</Text>
              </View>
            </Pressable>
          </>
        ) : (
          <>
            {currentRoute !== 'login' ? (
              <Pressable onPress={() => navigate('Login')} style={styles.actionButton}>
                <View style={styles.actionButtonInner}>
                  <LogIn size={16} color="#0f172a" />
                  <Text style={styles.secondaryButtonText}>Login</Text>
                </View>
              </Pressable>
            ) : null}
            {currentRoute !== 'register' ? (
              <Pressable onPress={() => navigate('Register')} style={[styles.actionButton, styles.primaryButton]}>
                <View style={styles.actionButtonInner}>
                  <UserPlus size={16} color="#ffffff" />
                  <Text style={styles.primaryButtonText}>Sign Up</Text>
                </View>
              </Pressable>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  actionButton: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  actionButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
});
