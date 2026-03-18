import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import lottieAnimations from '../../../assets/lottie-animations';

const tryRequire = (name: string) => {
  try {
    // eslint-disable-next-line no-eval, @typescript-eslint/no-implied-eval
    return eval('require')(name);
  } catch {
    return null;
  }
};

const LottieView = tryRequire('lottie-react-native')?.default ?? tryRequire('lottie-react-native');

export default function LandingScreen() {
  const [showSplash, setShowSplash] = React.useState(true);
  console.error('[startup] LandingScreen.native render', {
    showSplash,
    hasLottieView: !!LottieView,
  });

  React.useEffect(() => {
    console.error('[startup] LandingScreen.native effect: schedule splash timeout');
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    console.error('[startup] LandingScreen.native effect: showSplash changed', { showSplash });
  }, [showSplash]);

  if (showSplash) {
    console.error('[startup] LandingScreen.native -> splash branch');
    return (
      <SafeAreaView style={styles.splashPage}>
        <View style={styles.splashInner}>
          {LottieView ? (
            <LottieView
              source={lottieAnimations.poliveraiSplash}
              autoPlay
              loop={false}
              style={styles.lottie}
              resizeMode="contain"
            />
          ) : (
            <>
              <View style={styles.logoMark}>
                <Text style={styles.logoMarkText}>P</Text>
              </View>
              <Text style={styles.brandText}>PoliverAI</Text>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  console.error('[startup] LandingScreen.native -> content branch');
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Policy intelligence for Africa</Text>
          <Text style={styles.title}>PoliverAI</Text>
          <Text style={styles.subtitle}>
            Analyze policy, track change, and turn complex regulation into clear action.
          </Text>
          <View style={styles.buttonGroup}>
            <View style={[styles.button, styles.primaryButton]}>
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Get Started</Text>
            </View>
            <View style={[styles.button, styles.secondaryButton]}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Login</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you can do</Text>
          <Text style={styles.sectionBody}>Run policy analysis, generate reports, and manage credits from one place.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built for mobile first</Text>
          <Text style={styles.sectionBody}>
            Native startup is now isolated from the web landing stack so Android has a stable visible first screen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8fbff',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 18,
  },
  splashPage: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  splashInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  lottie: {
    width: 260,
    height: 260,
  },
  logoMark: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    marginBottom: 16,
  },
  logoMarkText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '800',
  },
  brandText: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
    gap: 14,
  },
  eyebrow: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    color: '#0f172a',
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonGroup: {
    marginTop: 8,
    gap: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    minHeight: 52,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButtonText: {
    color: '#0f172a',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionBody: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
});
