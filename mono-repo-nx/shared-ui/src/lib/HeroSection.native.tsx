import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t, useAuth } from '@poliverai/intl';
import { ArrowRight, LayoutDashboard, Search, Sparkles } from 'lucide-react-native';

const logo = require('../assets/poliverai-logo.png');
const andelaLogo = require('../assets/andela-logo-transparent.png');

function getCopy(path: string, fallback: string) {
  const value = t(path, fallback);
  return typeof value === 'string' ? value : fallback;
}

export default function HeroSection() {
  const navigation = useNavigation<any>();
  const { isAuthenticated } = useAuth();

  return (
    <View style={styles.wrap}>
      <View style={styles.heroCard}>
        <Image
          source={logo}
          accessibilityLabel={getCopy('brand.alt', 'PoliverAI')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {getCopy('landing.hero.prefix', 'Your')}{' '}
          <Text style={styles.titleHighlight}>{getCopy('landing.hero.highlight', 'AI-Powered')}</Text>{' '}
          {getCopy('landing.hero.suffix', 'GDPR Compliance Assistant')}
        </Text>
        <Text style={styles.lead}>
          {getCopy(
            'landing.hero.description',
            'Automatically analyze privacy policies for GDPR compliance, detect violations, and generate comprehensive reports with AI-powered insights.'
          )}
        </Text>

        <View style={styles.actions}>
          {isAuthenticated ? (
            <Pressable onPress={() => navigation.navigate('Dashboard')} style={[styles.button, styles.primaryButton]}>
              <View style={styles.buttonInner}>
                <LayoutDashboard size={18} color="#ffffff" />
                <Text style={styles.primaryButtonText}>
                  {getCopy('landing.buttons.go_dashboard', 'Go to Dashboard')}
                </Text>
              </View>
            </Pressable>
          ) : (
            <>
              <Pressable onPress={() => navigation.navigate('Signup')} style={[styles.button, styles.primaryButton]}>
                <View style={styles.buttonInner}>
                  <Search size={18} color="#ffffff" />
                  <Text style={styles.primaryButtonText}>
                    {getCopy('landing.buttons.start_free', 'Start Free Analysis')}
                  </Text>
                  <ArrowRight size={18} color="#ffffff" />
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Login')} style={[styles.button, styles.secondaryButton]}>
                <View style={styles.buttonInner}>
                  <Sparkles size={18} color="#0f172a" />
                  <Text style={styles.secondaryButtonText}>
                    {getCopy('landing.buttons.upgrade_to_pro', 'Upgrade to Pro')}
                  </Text>
                </View>
              </Pressable>
            </>
          )}
        </View>

        <View style={styles.partnerRow}>
          <Text style={styles.partnerText}>{getCopy('landing.partner.prefix', 'An')}</Text>
          <Image source={andelaLogo} style={styles.andelaLogo} resizeMode="contain" />
          <Text style={styles.partnerText}>
            {getCopy('landing.partner.suffix', 'initiative — designed in partnership with Andela')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 20,
  },
  heroCard: {
    alignItems: 'center',
  },
  logoImage: {
    width: 280,
    height: 120,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    color: '#0f172a',
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '700',
  },
  titleHighlight: {
    color: '#2563eb',
  },
  lead: {
    marginTop: 8,
    textAlign: 'center',
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 30,
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  button: {
    minHeight: 52,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  partnerRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  partnerText: {
    color: '#4b5563',
    fontSize: 16,
  },
  andelaLogo: {
    width: 96,
    height: 36,
  },
});
