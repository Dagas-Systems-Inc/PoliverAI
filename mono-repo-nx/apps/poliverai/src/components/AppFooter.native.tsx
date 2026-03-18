import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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
          {copy('footer.paragraph', 'A quick, reliable privacy policy analysis - get results fast and act with confidence.')}
        </Text>
        <Text style={styles.meta}>
          {copy('brand_block.copyright', `© ${new Date().getFullYear()} PoliverAI ™. All rights reserved.`)}
        </Text>
        <Text style={styles.meta}>{copy('brand_block.partnership', 'Designed in partnership with Andela')}</Text>

        <View style={styles.brandRow}>
          <View style={styles.logoWrap}>
            <Image source={brandAssets.poliveraiLogo} style={styles.poliveraiLogo} resizeMode="contain" />
          </View>
          <View style={styles.logoWrap}>
            <Image source={brandAssets.andelaLogo} style={styles.andelaLogo} resizeMode="contain" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  content: {
    width: '100%',
    maxWidth: 896,
    alignSelf: 'center',
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
    lineHeight: 24,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
  },
  meta: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(219,234,254,0.95)',
    textAlign: 'center',
  },
  brandRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  logoWrap: {
    marginHorizontal: 6,
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  poliveraiLogo: {
    width: 100,
    height: 36,
  },
  andelaLogo: {
    width: 130,
    height: 36,
  },
});
