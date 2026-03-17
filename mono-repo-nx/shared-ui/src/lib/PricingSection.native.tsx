import React, { useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth, PaymentsService } from '@poliverai/intl'
import { Button } from './Button/Button'

export default function PricingSection() {
  const navigation = useNavigation<any>()
  const { width } = useWindowDimensions()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const isWide = width >= 900

  const startUpgrade = async () => {
    if (!isAuthenticated) {
      navigation.navigate('Login')
      return
    }

    setLoading(true)
    try {
      await PaymentsService.purchaseUpgrade(29)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>Pricing</Text>
      <Text style={styles.title}>Use the same purchase flow in web and native</Text>
      <Text style={styles.lead}>
        Native opens hosted checkout externally, then the backend finalizes and returns to PoliverAI through a
        deep link the app can handle directly.
      </Text>

      <View style={[styles.cards, isWide && styles.cardsWide]}>
        <View style={[styles.card, isWide && styles.cardWide]}>
          <Text style={styles.planTitle}>Free tier</Text>
          <Text style={styles.price}>$0</Text>
          <Text style={styles.planLead}>Great for baseline GDPR checks.</Text>
          {['Basic verification', 'Fast analysis mode', 'Core recommendations'].map((item) => (
            <Text key={item} style={styles.featureItem}>• {item}</Text>
          ))}
          <Button
            title={isAuthenticated ? 'Go to dashboard' : 'Get started free'}
            variant="outline"
            onPress={() => navigation.navigate(isAuthenticated ? 'Dashboard' : 'Signup')}
            style={styles.cta}
          />
        </View>

        <View style={[styles.card, styles.cardPrimary, isWide && styles.cardWide]}>
          <Text style={styles.popular}>Popular</Text>
          <Text style={styles.planTitle}>Pro tier</Text>
          <Text style={[styles.price, styles.pricePrimary]}>$29/mo</Text>
          <Text style={styles.planLead}>For deep AI analysis and reporting.</Text>
          {['Everything in Free', 'AI-powered deep analysis', 'Comprehensive reporting', 'Policy revision workflows'].map((item) => (
            <Text key={item} style={styles.featureItem}>• {item}</Text>
          ))}
          <Button
            title={isAuthenticated ? 'Upgrade with Stripe' : 'Sign in to upgrade'}
            onPress={startUpgrade}
            loading={loading}
            style={{ ...styles.cta, ...styles.ctaPrimary }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  eyebrow: {
    textAlign: 'center',
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    color: '#0F172A',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  lead: {
    marginTop: 10,
    textAlign: 'center',
    color: '#475569',
    fontSize: 16,
    lineHeight: 25,
    maxWidth: 760,
    alignSelf: 'center',
  },
  cards: {
    marginTop: 24,
    gap: 16,
  },
  cardsWide: {
    flexDirection: 'row',
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  cardWide: {
    flex: 1,
  },
  cardPrimary: {
    backgroundColor: '#EFF6FF',
    borderColor: '#60A5FA',
  },
  popular: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  planTitle: {
    marginTop: 12,
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '700',
  },
  price: {
    marginTop: 12,
    color: '#0F172A',
    fontSize: 34,
    fontWeight: '800',
  },
  pricePrimary: {
    color: '#2563EB',
  },
  planLead: {
    marginTop: 8,
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  featureItem: {
    marginTop: 10,
    color: '#0F172A',
    fontSize: 15,
    lineHeight: 22,
  },
  cta: {
    marginTop: 18,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#93C5FD',
    backgroundColor: '#FFFFFF',
  },
  ctaPrimary: {
    borderWidth: 0,
    backgroundColor: '#2563EB',
  },
})
