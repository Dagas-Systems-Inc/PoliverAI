import React from 'react';
import { Image, Modal, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PaymentsService, useAuth } from '@poliverai/intl';
import EnterCreditsModal from '../../../../shared-ui/src/lib/EnterCreditsModal.native';
import { brandAssets } from '../../assets/brand';
import { CreditCard, LayoutDashboard, LogIn, LogOut, Menu, ShieldCheck, Sparkles, UserPlus, X } from 'lucide-react-native';

type AppTopNavProps = {
  currentRoute?: 'landing' | 'login' | 'register' | 'dashboard' | 'analyze' | 'credits' | 'reports';
};

type WebLocationLike = {
  href?: string;
  pathname?: string;
};

const webStickyStyle = {
  position: 'sticky',
  top: 0,
  backdropFilter: 'blur(18px)',
} as any;

function NavActionButton({
  label,
  onPress,
  icon,
  variant = 'ghost',
  fullWidth = false,
}: {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.actionButton,
        variant === 'primary' ? styles.primaryButton : null,
        variant === 'secondary' ? styles.secondaryButton : null,
        variant === 'ghost' ? styles.ghostButton : null,
        fullWidth ? styles.mobileActionButton : null,
      ]}
    >
      <View style={styles.actionButtonInner}>
        {icon ? <View style={styles.actionButtonIcon}>{icon}</View> : null}
        <Text
          style={[
            styles.actionButtonText,
            variant === 'primary' ? styles.primaryButtonText : null,
            variant === 'secondary' ? styles.secondaryButtonText : null,
            variant === 'ghost' ? styles.ghostButtonText : null,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function AppTopNav({ currentRoute = 'landing' }: AppTopNavProps) {
  const navigation = useNavigation<any>();
  const { isAuthenticated, isPro, user, logout } = useAuth() as unknown as {
    isAuthenticated?: boolean;
    isPro?: boolean;
    user?: { name?: string | null; credits?: number | null };
    logout?: () => void | Promise<void>;
  };
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = React.useState(false);

  const isDesktop = width > 980;
  const isDashboard =
    currentRoute === 'dashboard' ||
    currentRoute === 'analyze' ||
    currentRoute === 'credits' ||
    currentRoute === 'reports';
  const creditCount = Number(user?.credits ?? 0);
  const displayName = user?.name?.trim() || 'Account';

  const safeNavigate = React.useCallback((routeName: string, webPath: string) => {
    try {
      navigation.navigate(routeName);
      setMenuOpen(false);
      return;
    } catch {
      const g = typeof globalThis !== 'undefined' ? (globalThis as { location?: WebLocationLike }) : undefined;
      if (g?.location) {
        if (webPath.startsWith('/#')) g.location.href = webPath;
        else g.location.pathname = webPath;
      }
    }
    setMenuOpen(false);
  }, [navigation]);

  const handleLogout = React.useCallback(async () => {
    try {
      await logout?.();
    } finally {
      safeNavigate('WebLanding', '/');
    }
  }, [logout, safeNavigate]);

  const showLoginAction = !isAuthenticated && currentRoute !== 'login';
  const showSignupAction = !isAuthenticated && currentRoute !== 'register';

  const dashboardDesktopActions = (
    <>
      <View style={styles.dashboardLinksRow}>
        <Pressable onPress={() => safeNavigate('Dashboard', '/dashboard')}>
          <Text style={styles.dashboardLink}>Dashboard</Text>
        </Pressable>
        <Pressable onPress={() => safeNavigate('Analyze', '/analyze')}>
          <Text style={styles.dashboardLink}>Analyze Policy</Text>
        </Pressable>
        <Pressable onPress={() => safeNavigate('Reports', '/reports')}>
          <Text style={styles.dashboardLink}>Reports</Text>
        </Pressable>
        <Pressable onPress={() => safeNavigate('Credits', '/credits')}>
          <Text style={styles.dashboardLink}>Transaction History</Text>
        </Pressable>
      </View>
      <View style={styles.userMeta}>
        <View style={[styles.planBadge, isPro ? styles.proBadge : styles.freeBadge]}>
          <Text style={styles.planBadgeText}>{isPro ? 'PRO' : 'FREE'}</Text>
        </View>
        <Text style={styles.creditsText}>Credits: {creditCount}</Text>
        <Text style={styles.userNameText}>{displayName}</Text>
      </View>
      {!isPro ? (
        <NavActionButton
          label="Upgrade to Pro"
          onPress={() => PaymentsService.purchaseUpgrade(29).catch(() => undefined)}
          icon={<Sparkles size={16} color="#ffffff" />}
          variant="primary"
        />
      ) : null}
      <NavActionButton label="Buy Credits" onPress={() => setCreditsModalOpen(true)} icon={<CreditCard size={16} color="#ffffff" />} variant="secondary" />
      <NavActionButton label="Logout" onPress={handleLogout} icon={<LogOut size={16} color="#0f172a" />} variant="ghost" />
    </>
  );

  const authDesktopActions = isAuthenticated ? (
    <NavActionButton
      label="Go to Dashboard"
      onPress={() => safeNavigate('Dashboard', '/dashboard')}
      icon={<LayoutDashboard size={16} color="#ffffff" />}
      variant="primary"
    />
  ) : (
    <>
      {showLoginAction ? (
        <NavActionButton label="Login" onPress={() => safeNavigate('Login', '/login')} icon={<LogIn size={16} color="#0f172a" />} variant="ghost" />
      ) : null}
      {showSignupAction ? (
        <NavActionButton label="Sign Up" onPress={() => safeNavigate('Register', '/register')} icon={<UserPlus size={16} color="#ffffff" />} variant="primary" />
      ) : null}
    </>
  );

  const dashboardMobileActions = (
    <>
      <NavActionButton label="Dashboard" onPress={() => safeNavigate('Dashboard', '/dashboard')} icon={<LayoutDashboard size={16} color="#0f172a" />} variant="ghost" fullWidth />
      <NavActionButton label="Analyze Policy" onPress={() => safeNavigate('Analyze', '/analyze')} icon={<ShieldCheck size={16} color="#0f172a" />} variant="ghost" fullWidth />
      <NavActionButton label="Reports" onPress={() => safeNavigate('Reports', '/reports')} icon={<ShieldCheck size={16} color="#0f172a" />} variant="ghost" fullWidth />
      <NavActionButton label="Transaction History" onPress={() => safeNavigate('Credits', '/credits')} icon={<CreditCard size={16} color="#0f172a" />} variant="ghost" fullWidth />
      {!isPro ? (
        <NavActionButton
          label="Upgrade to Pro"
          onPress={() => PaymentsService.purchaseUpgrade(29).catch(() => undefined)}
          icon={<Sparkles size={16} color="#ffffff" />}
          variant="primary"
          fullWidth
        />
      ) : null}
      <NavActionButton label="Buy Credits" onPress={() => setCreditsModalOpen(true)} icon={<CreditCard size={16} color="#ffffff" />} variant="secondary" fullWidth />
      <NavActionButton label="Logout" onPress={handleLogout} icon={<LogOut size={16} color="#0f172a" />} variant="ghost" fullWidth />
      <View style={styles.mobileMeta}>
        <Text style={styles.mobileMetaText}>{isPro ? 'PRO' : 'FREE'}</Text>
        <Text style={styles.mobileMetaText}>Credits: {creditCount}</Text>
        <Text style={styles.mobileMetaText}>{displayName}</Text>
      </View>
    </>
  );

  const authMobileActions = isAuthenticated ? (
    <NavActionButton
      label="Go to Dashboard"
      onPress={() => safeNavigate('Dashboard', '/dashboard')}
      icon={<LayoutDashboard size={16} color="#ffffff" />}
      variant="primary"
      fullWidth
    />
  ) : (
    <>
      {showLoginAction ? (
        <NavActionButton label="Login" onPress={() => safeNavigate('Login', '/login')} icon={<LogIn size={16} color="#0f172a" />} variant="ghost" fullWidth />
      ) : null}
      {showSignupAction ? (
        <NavActionButton label="Sign Up" onPress={() => safeNavigate('Register', '/register')} icon={<UserPlus size={16} color="#ffffff" />} variant="primary" fullWidth />
      ) : null}
    </>
  );

  return (
    <View style={[styles.outer, Platform.OS === 'web' ? webStickyStyle : null]}>
      <View style={styles.inner}>
        <Pressable onPress={() => safeNavigate('WebLanding', '/')} style={styles.brandButton}>
          {Platform.OS === 'web' ? (
            <Image source={brandAssets.poliveraiIconTransparent} style={styles.brandIconImage} resizeMode="contain" />
          ) : (
            <View style={styles.brandIcon}>
              <Text style={styles.brandIconText}>P</Text>
            </View>
          )}
          <Text style={styles.brandText}>
            Poliver <Text style={styles.brandAccent}>AI</Text>
          </Text>
        </Pressable>

        {isDesktop ? (
          <View style={styles.actionsRow}>
            {isAuthenticated && isDashboard ? dashboardDesktopActions : authDesktopActions}
          </View>
        ) : (
          <Pressable onPress={() => setMenuOpen((value) => !value)} style={styles.menuButton}>
            <View style={styles.actionButtonInner}>
              {menuOpen ? <X size={16} color="#0f172a" /> : <Menu size={16} color="#0f172a" />}
              <Text style={styles.menuButtonText}>{menuOpen ? 'Close' : 'Menu'}</Text>
            </View>
          </Pressable>
        )}
      </View>

      {!isDesktop ? (
        <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
          <Pressable style={styles.mobileMenuBackdrop} onPress={() => setMenuOpen(false)}>
            <Pressable style={styles.mobileMenuSheet} onPress={() => undefined}>
              <View style={styles.mobileMenuHeader}>
                <Text style={styles.mobileMenuTitle}>Menu</Text>
                <Pressable onPress={() => setMenuOpen(false)} style={styles.mobileMenuCloseButton}>
                  <X size={18} color="#0f172a" />
                </Pressable>
              </View>
              <View style={styles.mobileActionsRow}>
                {isAuthenticated && isDashboard ? dashboardMobileActions : authMobileActions}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      ) : null}
      <EnterCreditsModal
        open={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
        onConfirm={async (amountUsd) => {
          await PaymentsService.purchaseCredits(amountUsd);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.9)',
    zIndex: 40,
  },
  inner: {
    maxWidth: 1240,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  brandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 30px rgba(37, 99, 235, 0.22)',
  } as any,
  brandIconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  brandIconImage: {
    width: 40,
    height: 40,
  },
  brandText: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
  },
  brandAccent: {
    color: '#2563eb',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    flexWrap: 'wrap',
    flex: 1,
  },
  dashboardLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dashboardLink: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  planBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  freeBadge: {
    backgroundColor: '#dcfce7',
  },
  proBadge: {
    backgroundColor: '#dbeafe',
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  creditsText: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '700',
  },
  userNameText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },
  ghostButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  ghostButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 18px 40px rgba(37, 99, 235, 0.22)',
  } as any,
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  menuButton: {
    minHeight: 42,
    minWidth: 72,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  mobileMenuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.38)',
    justifyContent: 'flex-start',
    paddingTop: 82,
    paddingHorizontal: 16,
  },
  mobileMenuSheet: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.95)',
    padding: 12,
    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
  } as any,
  mobileMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mobileMenuTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },
  mobileMenuCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  mobileActionsRow: {
    flexDirection: 'column',
    gap: 10,
  },
  mobileActionButton: {
    width: '100%',
  },
  mobileMeta: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226,232,240,0.95)',
    gap: 4,
  },
  mobileMetaText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
  },
});
