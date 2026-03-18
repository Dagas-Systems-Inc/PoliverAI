import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { t } from '@poliverai/intl';

const freeFeatures = [
  {
    badge: 'F',
    title: 'Basic Policy Verification',
    description: 'Upload and analyze privacy policies for basic GDPR compliance checks using rule-based detection.',
  },
  {
    badge: 'E',
    title: 'Essential Compliance Checks',
    description: 'Detect fundamental GDPR violations and get basic recommendations for improvement.',
  },
  {
    badge: 'Q',
    title: 'Fast Analysis',
    description: 'Quick compliance screening using our optimized rule-based analysis engine.',
  },
];

const proFeatures = [
  {
    badge: 'AI',
    title: 'AI-Powered Deep Analysis',
    description: 'Advanced AI analysis that detects nuanced privacy violations and complex compliance issues.',
  },
  {
    badge: 'R',
    title: 'Comprehensive Reporting',
    description: 'Detailed compliance reports with confidence scores, evidence, and actionable recommendations.',
  },
  {
    badge: 'P',
    title: 'Policy Generation & Revision',
    description: 'Generate revised policies automatically based on detected compliance gaps.',
  },
];

function copy(path: string, fallback: string) {
  const value = t(path, fallback);
  return typeof value === 'string' ? value : fallback;
}

function FeatureCard({
  badge,
  title,
  description,
  pro = false,
}: {
  badge: string;
  title: string;
  description: string;
  pro?: boolean;
}) {
  return (
    <View style={[styles.featureCard, pro ? styles.proCard : null]}>
      <View style={styles.featureHeader}>
        <View style={[styles.featureBadge, pro ? styles.proBadge : styles.freeBadge]}>
          <Text style={[styles.featureBadgeText, pro ? styles.proBadgeText : styles.freeBadgeText]}>{badge}</Text>
        </View>
        <Text style={styles.featureTitle}>{title}</Text>
        {pro ? (
          <View style={styles.proPill}>
            <Text style={styles.proPillText}>PRO</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

export default function FeaturesSection() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>{copy('landing.features.title', 'Powerful Features for Every Need')}</Text>
        <Text style={styles.subheading}>
          {copy('landing.features.subtitle', 'From basic compliance checks to advanced AI-powered analysis')}
        </Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>{copy('landing.features.free_heading', 'Free Tier Features')}</Text>
        <View style={styles.grid}>
          {freeFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>{copy('landing.features.pro_heading', 'Pro Tier Features')}</Text>
        <View style={styles.grid}>
          {proFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} pro />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    maxWidth: 1280,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heading: {
    color: '#0f172a',
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '700',
  },
  subheading: {
    marginTop: 12,
    maxWidth: 760,
    color: '#475569',
    fontSize: 18,
    lineHeight: 29,
    textAlign: 'center',
  },
  group: {
    marginBottom: 28,
    width: '100%',
  },
  groupTitle: {
    marginBottom: 18,
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
  },
  featureCard: {
    width: 320,
    minHeight: 190,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.9)',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  proCard: {
    borderColor: 'rgba(37,99,235,0.2)',
    backgroundColor: 'rgba(239,246,255,0.95)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeBadge: {
    backgroundColor: 'rgba(22,163,74,0.12)',
  },
  proBadge: {
    backgroundColor: 'rgba(37,99,235,0.12)',
  },
  featureBadgeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  freeBadgeText: {
    color: '#16a34a',
  },
  proBadgeText: {
    color: '#2563eb',
  },
  featureTitle: {
    flex: 1,
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
  },
  proPill: {
    borderRadius: 999,
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  proPillText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  featureDescription: {
    marginTop: 16,
    color: '#475569',
    fontSize: 15,
    lineHeight: 26,
  },
});
