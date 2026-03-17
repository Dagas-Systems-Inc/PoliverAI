import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

const FREE_FEATURES = [
  ['Basic policy verification', 'Fast rule-based compliance checks for quick audits.'],
  ['Essential recommendations', 'Clear guidance on obvious GDPR gaps before deeper review.'],
  ['Fast analysis mode', 'Low-friction screening for early validation and triage.'],
]

const PRO_FEATURES = [
  ['AI-powered deep analysis', 'Nuanced issue detection and richer compliance reasoning.'],
  ['Comprehensive reporting', 'Structured outputs with evidence, scoring, and action items.'],
  ['Policy revision workflows', 'Generate improved policy drafts from detected gaps.'],
]

export default function FeaturesSection() {
  const { width } = useWindowDimensions()
  const isWide = width >= 960

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>Feature map</Text>
      <Text style={styles.title}>Keep the same feature breakdown in native</Text>
      <Text style={styles.lead}>
        The mobile and tablet views should not flatten the product into a different information architecture.
      </Text>

      <View style={[styles.columns, isWide && styles.columnsWide]}>
        <View style={[styles.column, isWide && styles.columnWide]}>
          <Text style={styles.columnTitle}>Free tier</Text>
          {FREE_FEATURES.map(([title, description]) => (
            <View key={title} style={styles.featureCard}>
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDescription}>{description}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.column, styles.columnPro, isWide && styles.columnWide]}>
          <Text style={styles.columnTitle}>Pro tier</Text>
          {PRO_FEATURES.map(([title, description]) => (
            <View key={title} style={styles.featureCard}>
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDescription}>{description}</Text>
            </View>
          ))}
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
  columns: {
    marginTop: 22,
    gap: 16,
  },
  columnsWide: {
    flexDirection: 'row',
  },
  column: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    gap: 12,
  },
  columnWide: {
    flex: 1,
  },
  columnPro: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  columnTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
  },
  featureCard: {
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    padding: 14,
  },
  featureTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  featureDescription: {
    marginTop: 4,
    color: '#475569',
    fontSize: 14,
    lineHeight: 21,
  },
})
