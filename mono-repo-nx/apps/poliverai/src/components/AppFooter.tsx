import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { t } from '@poliverai/intl';
import { brandAssets } from '../../assets/brand';

function copy(path: string, fallback: string) {
  const value = t(path, fallback);
  return typeof value === 'string' ? value : fallback;
}

export default function AppFooter() {
  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <Text style={styles.short}>{copy('footer.short', 'Fast, simple GDPR compliance checks')}</Text>
        <Text style={styles.paragraph}>
          {copy('footer.paragraph', 'A quick, reliable privacy policy analysis — get results fast and act with confidence.')}
        </Text>
        <Text style={styles.meta}>
          {copy('brand_block.copyright', `© ${new Date().getFullYear()} PoliverAI ™. All rights reserved.`)}
        </Text>
        <Text style={styles.meta}>{copy('brand_block.partnership', 'Designed in partnership with Andela')}</Text>
        <View style={styles.brandPill}>
          <Image source={brandAssets.poliveraiLogo} style={styles.brandIconImage} resizeMode="contain" />
          <Image source={brandAssets.andelaLogo} style={styles.andelaIconImage} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  content: {
    maxWidth: 896,
    width: '100%',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  short: {
    fontSize: 14,
    color: 'rgba(219,234,254,0.95)',
    textAlign: 'center',
  },
  paragraph: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 27,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
  },
  meta: {
    marginTop: 6,
    fontSize: 14,
    color: 'rgba(219,234,254,0.95)',
    textAlign: 'center',
  },
  brandPill: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  brandIconImage: {
    width: 100,
    height: 50,
  },
  andelaIconImage: {
    width: 130,
    height: 50,
  },
  brandText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  partnerText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
});
