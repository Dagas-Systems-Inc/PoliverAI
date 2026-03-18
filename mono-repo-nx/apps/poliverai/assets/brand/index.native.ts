import type { ImageSourcePropType } from 'react-native';

export type BrandImageSource = ImageSourcePropType;

export const brandAssets = {
  poliveraiLogo: require('../../../../shared-ui/src/assets/poliverai-logo.png') as ImageSourcePropType,
  poliveraiLogoSvg: require('../../../../shared-ui/src/assets/poliverai-logo.png') as ImageSourcePropType,
  poliveraiIcon: require('../../../../shared-ui/src/assets/poliverai-logo.png') as ImageSourcePropType,
  poliveraiIconTransparent: require('../../../../shared-ui/src/assets/poliverai-logo.png') as ImageSourcePropType,
  andelaLogo: require('../../../../shared-ui/src/assets/andela-logo-transparent.png') as ImageSourcePropType,
};

export default brandAssets;

export type BrandAssets = typeof brandAssets;
