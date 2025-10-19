import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { colors } from './styleTokens';

import { useTranslation } from '@poliverai/intl';

// Inline data-URI placeholders to avoid dev-server asset resolution issues during porting.
// Replace these with real asset imports or public file URLs when you copy assets from `frontend/dist`.
const logoDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
const andelaDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

// Convert imported asset values (which are strings in ESM env) into ImageSourcePropType
const toImageSource = (src: unknown): ImageSourcePropType => {
  if (!src) return undefined as any
  // In native/metro static requires -> numbers/objects; in web vite imports -> string URL
  if (typeof src === 'string') return { uri: src }
  return src as ImageSourcePropType
}

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const logoSource = toImageSource(logoDataUri)
  const andelaSource = toImageSource(andelaDataUri)
  return (
    <View style={styles.container}>
      <Image source={logoSource} style={styles.logo} resizeMode="contain" />
      <Text style={styles.heading}>
        {t('landing.hero.prefix')} <Text style={styles.highlight}>{t('landing.hero.highlight')}</Text> {t('landing.hero.suffix')}
      </Text>
      <Text style={styles.lead}>{t('landing.hero.description')}</Text>
      {/* CTA buttons would go here */}
      <View style={styles.partnerRow}>
        <Text style={styles.partnerText}>{t('landing.partner.prefix')}</Text>
  <Image source={andelaSource} style={styles.andelaLogo} resizeMode="contain" />
        <Text style={styles.partnerText}>{t('landing.partner.suffix')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  paddingVertical: 24,
    backgroundColor: colors.pageBg.hex,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary.hex,
    marginBottom: 8,
    textAlign: 'center',
  },
  highlight: {
    color: colors.primary.hex,
  },
  lead: {
    fontSize: 18,
    color: colors.textMuted.hex,
    marginBottom: 16,
    textAlign: 'center',
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  partnerText: {
    fontSize: 16,
    color: colors.textMuted.hex,
    marginHorizontal: 4,
  },
  andelaLogo: {
    width: 40,
    height: 40,
    marginHorizontal: 4,
  },
});

export default HeroSection;
