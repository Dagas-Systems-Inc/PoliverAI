import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { t } from '@poliverai/intl';

interface FooterProps {
  hasBackground?: boolean;
}

function copy(path: string, fallback: string) {
  const value = t(path, fallback);
  return typeof value === 'string' ? value : fallback;
}

export default function Footer({ hasBackground = true }: FooterProps) {
  return (
    <View style={[styles.footer, hasBackground ? styles.footerBg : styles.footerTransparent]}>
      <View style={styles.content}>
        <Text style={[styles.short, hasBackground ? styles.shortOnBlue : styles.shortOnWhite]}>
          {copy('footer.short', 'Fast, simple GDPR compliance checks')}
        </Text>
        <Text style={[styles.paragraph, hasBackground ? styles.paragraphOnBlue : styles.paragraphOnWhite]}>
          {copy('footer.paragraph', 'A quick, reliable privacy policy analysis — get results fast and act with confidence.')}
        </Text>
        <Text style={[styles.meta, hasBackground ? styles.metaOnBlue : styles.metaOnWhite]}>
          {copy('brand_block.copyright', `© ${new Date().getFullYear()} PoliverAI ™. All rights reserved.`)}
        </Text>
        <Text style={[styles.meta, hasBackground ? styles.metaOnBlue : styles.metaOnWhite]}>
          {copy('brand_block.partnership', 'Designed in partnership with Andela')}
        </Text>
        <View style={[styles.brandPill, Platform.OS === 'web' ? ({ boxShadow: '0 2px 10px rgba(15, 23, 42, 0.12)' } as any) : null]}>
          <Image
            source={{ uri: '/poliverai-logo.png' }}
            style={styles.brandIconImage}
            resizeMode="contain"
          />
          <Image
            source={{ uri: '/andela-logo-transparent.png' }}
            style={styles.andelaIconImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  footerBg: {
    backgroundColor: '#2563eb',
  },
  footerTransparent: {
    backgroundColor: 'transparent',
  },
  content: {
    maxWidth: 896,
    width: '100%',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  short: {
    maxWidth: 640,
    fontSize: 14,
    textAlign: 'center',
  },
  shortOnBlue: {
    color: 'rgba(219, 234, 254, 0.95)',
  },
  shortOnWhite: {
    color: '#64748b',
  },
  paragraph: {
    maxWidth: 640,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 27,
    textAlign: 'center',
  },
  paragraphOnBlue: {
    color: 'rgba(255,255,255,0.92)',
  },
  paragraphOnWhite: {
    color: '#475569',
  },
  meta: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
  metaOnBlue: {
    color: 'rgba(219, 234, 254, 0.95)',
  },
  metaOnWhite: {
    color: '#64748b',
  },
  brandPill: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconText: {
    color: '#ffffff',
    fontSize: 20,
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
