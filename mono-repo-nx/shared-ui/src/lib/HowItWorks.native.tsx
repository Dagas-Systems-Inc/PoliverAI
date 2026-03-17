import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

const STEPS = [
  ['1', 'Upload your policy', 'Accept the same document workflow across native and web.'],
  ['2', 'Analyze with AI', 'Run the same product logic without forking the UI architecture.'],
  ['3', 'Return with results', 'Payment and report flows come back through app-aware navigation.'],
]

export default function HowItWorks() {
  const { width } = useWindowDimensions()
  const isWide = width >= 960

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>How it works</Text>
      <Text style={styles.title}>A native flow that still feels like the web product</Text>
      <View style={[styles.row, isWide && styles.rowWide]}>
        {STEPS.map(([n, title, description]) => (
          <View key={n} style={[styles.stepCard, isWide && styles.stepCardWide]}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{n}</Text>
            </View>
            <Text style={styles.stepTitle}>{title}</Text>
            <Text style={styles.stepDescription}>{description}</Text>
          </View>
        ))}
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
  row: {
    marginTop: 22,
    gap: 16,
  },
  rowWide: {
    flexDirection: 'row',
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
  },
  stepCardWide: {
    flex: 1,
  },
  stepBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    color: '#1D4ED8',
    fontSize: 18,
    fontWeight: '800',
  },
  stepTitle: {
    marginTop: 16,
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  stepDescription: {
    marginTop: 6,
    color: '#475569',
    fontSize: 14,
    lineHeight: 22,
  },
})
