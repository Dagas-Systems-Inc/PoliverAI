import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

const PLATFORMS = [
  { label: 'iOS', note: 'Touch-first native' },
  { label: 'Android', note: 'Responsive native' },
  { label: 'Web', note: 'RN Web parity' },
]

export default function AppPlatforms() {
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>Platform coverage</Text>
      <Text style={styles.title}>The same layout system across every client</Text>
      <View style={[styles.grid, isWide && styles.gridWide]}>
        {PLATFORMS.map((platform) => (
          <View key={platform.label} style={[styles.card, isWide && styles.cardWide]}>
            <Text style={styles.cardLabel}>{platform.label}</Text>
            <Text style={styles.cardNote}>{platform.note}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 14,
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
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
  },
  grid: {
    marginTop: 20,
    gap: 12,
  },
  gridWide: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
  },
  cardWide: {
    flex: 1,
  },
  cardLabel: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  cardNote: {
    marginTop: 6,
    color: '#475569',
    fontSize: 14,
    lineHeight: 21,
  },
})
