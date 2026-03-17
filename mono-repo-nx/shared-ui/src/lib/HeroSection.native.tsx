import React from 'react'
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from './Button/Button'
import { colors } from './styleTokens'
import { useAuth } from '@poliverai/intl'

const logo = require('../assets/poliverai-logo.png')
const andelaLogo = require('../assets/andela-logo-transparent.png')

export default function HeroSection() {
  const navigation = useNavigation<any>()
  const { width } = useWindowDimensions()
  const { isAuthenticated } = useAuth()
  const isTablet = width >= 768
  const isDesktop = width >= 1100

  return (
    <View style={styles.shell}>
      <View style={[styles.panel, isTablet && styles.panelTablet, isDesktop && styles.panelDesktop]}>
        <View style={[styles.copyColumn, isDesktop && styles.copyColumnDesktop]}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>AI-powered GDPR analysis</Text>
          </View>
          <Image source={logo} resizeMode="contain" style={[styles.logo, isTablet && styles.logoTablet]} />
          <Text style={[styles.heading, isTablet && styles.headingTablet]}>
            Audit privacy policies with{' '}
            <Text style={styles.headingAccent}>one native UI layer</Text>
          </Text>
          <Text style={[styles.lead, isTablet && styles.leadTablet]}>
            Keep the same PoliverAI structure across mobile, tablet, desktop, and web while preserving the
            product’s current landing flow and payment outcomes.
          </Text>
          <View style={[styles.actions, isTablet && styles.actionsTablet]}>
            <Button
              title={isAuthenticated ? 'Open dashboard' : 'Start free analysis'}
              size={isTablet ? 'lg' : 'md'}
              onPress={() => navigation.navigate(isAuthenticated ? 'Dashboard' : 'Signup')}
              style={styles.primaryAction}
            />
            <Button
              title={isAuthenticated ? 'View credits' : 'Sign in'}
              variant="outline"
              size={isTablet ? 'lg' : 'md'}
              onPress={() => navigation.navigate(isAuthenticated ? 'Credits' : 'Login')}
              style={styles.secondaryAction}
            />
          </View>
          <View style={styles.partnerRow}>
            <Text style={styles.partnerText}>Built with execution support from</Text>
            <Image source={andelaLogo} resizeMode="contain" style={styles.partnerLogo} />
          </View>
        </View>

        <View style={[styles.previewCard, isDesktop && styles.previewCardDesktop]}>
          <Text style={styles.previewEyebrow}>Responsive parity</Text>
          <Text style={styles.previewTitle}>One breakdown, three surfaces</Text>
          <View style={styles.previewStack}>
            <View style={[styles.previewDevice, styles.previewPhone]}>
              <Text style={styles.previewDeviceTitle}>Phone</Text>
              <Text style={styles.previewDeviceText}>Stacked sections with touch-first spacing.</Text>
            </View>
            <View style={[styles.previewDevice, styles.previewTablet]}>
              <Text style={styles.previewDeviceTitle}>Tablet</Text>
              <Text style={styles.previewDeviceText}>Two-column composition that mirrors the web rhythm.</Text>
            </View>
            <View style={[styles.previewDevice, styles.previewDesktop]}>
              <Text style={styles.previewDeviceTitle}>Desktop web</Text>
              <Text style={styles.previewDeviceText}>Same RN components rendered through React Native Web.</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shell: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 12,
  },
  panel: {
    backgroundColor: '#F6FAFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#D9E8FF',
    padding: 24,
    gap: 24,
  },
  panelTablet: {
    padding: 32,
  },
  panelDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 40,
  },
  copyColumn: {
    flex: 1,
  },
  copyColumnDesktop: {
    paddingRight: 24,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
    marginBottom: 16,
  },
  badgeText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  logo: {
    width: 180,
    height: 52,
    marginBottom: 16,
  },
  logoTablet: {
    width: 220,
    height: 64,
  },
  heading: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: colors.textPrimary.hex,
  },
  headingTablet: {
    fontSize: 48,
    lineHeight: 56,
  },
  headingAccent: {
    color: '#2563EB',
  },
  lead: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 26,
    color: colors.textMuted.hex,
    maxWidth: 720,
  },
  leadTablet: {
    fontSize: 18,
    lineHeight: 30,
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
  actionsTablet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryAction: {
    minWidth: 190,
    backgroundColor: '#2563EB',
  },
  secondaryAction: {
    minWidth: 170,
    borderWidth: 1,
    borderColor: '#93C5FD',
    backgroundColor: '#FFFFFF',
  },
  partnerRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  partnerText: {
    fontSize: 14,
    color: colors.textMuted.hex,
  },
  partnerLogo: {
    width: 92,
    height: 28,
  },
  previewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 20,
  },
  previewCardDesktop: {
    width: 360,
  },
  previewEyebrow: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  previewTitle: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  previewStack: {
    marginTop: 18,
    gap: 12,
  },
  previewDevice: {
    borderRadius: 18,
    padding: 16,
  },
  previewPhone: {
    backgroundColor: '#172554',
  },
  previewTablet: {
    backgroundColor: '#1D4ED8',
  },
  previewDesktop: {
    backgroundColor: '#E0F2FE',
  },
  previewDeviceTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  previewDeviceText: {
    color: '#DBEAFE',
    fontSize: 14,
    lineHeight: 21,
  },
})
