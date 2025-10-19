import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './styleTokens';
import FeatureCard from './FeatureCard';
import { CheckCircle2, Zap } from 'lucide-react-native';
// Try to call the workspace hook if available; otherwise fall back to a local stub.
function tryUseAvailableFeatures(hasCredits: boolean) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const intl = require('@poliverai/intl')
    if (intl && typeof intl.useAvailableFeatures === 'function') return intl.useAvailableFeatures(hasCredits)
  } catch (e) {
    // ignore
  }
  return { freeFeatures: [], proFeatures: [] }
}

const FeaturesSection: React.FC = () => {
  const { freeFeatures, proFeatures } = tryUseAvailableFeatures(false as any) as any
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Features</Text>
      {/* Free Features */}
      <View style={styles.sectionTitle}>
        <View style={styles.headingRow}>
          <CheckCircle2 size={24} color={colors.success.hex} />
          <Text style={styles.subheading}>Free Features</Text>
        </View>
        <View style={styles.cardsRow}>
          {freeFeatures.map((f: any, i: number) => (
            <FeatureCard key={i} {...f} />
          ))}
        </View>
      </View>
      {/* Pro Features */}
      <View style={styles.sectionTitle}>
        <View style={styles.headingRow}>
          <Zap size={24} color={colors.primary.hex} />
          <Text style={styles.subheading}>Pro Features</Text>
        </View>
        <View style={styles.cardsRow}>
          {proFeatures.map((f: any, i: number) => (
            <FeatureCard key={`pro-${i}`} {...f} isPro />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: colors.pageBg.hex,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary.hex,
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: 24,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textMuted.hex,
    marginLeft: 8,
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
});

export default FeaturesSection;
