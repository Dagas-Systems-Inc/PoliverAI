import React from 'react';
import { useAuth } from '@poliverai/intl';
import HeroSection from '../../../../../shared-ui/src/lib/HeroSection.native';
import FeaturesSection from '../../../../../shared-ui/src/lib/FeaturesSection.native';
import AppPlatforms from '../../../../../shared-ui/src/lib/AppPlatforms.native';
import HowItWorks from '../../../../../shared-ui/src/lib/HowItWorks.native';
import PricingSection from '../../../../../shared-ui/src/lib/PricingSection.native';
import CTASection from '../../../../../shared-ui/src/lib/CTASection.native';
import TeamCarousel from '../../../../../shared-ui/src/lib/TeamCarousel';
import TeamWriteup from '../../../../../shared-ui/src/lib/TeamWriteup';
import AppFooter from '../../components/AppFooter';

type LandingScreenContentProps = {
  showSplash: boolean;
  onSplashFinish: () => void;
  wrapSection?: (id: string, children: React.ReactNode) => React.ReactNode;
};

export default function LandingScreenContent({
  showSplash,
  onSplashFinish,
  wrapSection,
}: LandingScreenContentProps) {
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (showSplash) {
      onSplashFinish();
    }
  }, [onSplashFinish, showSplash]);

  const section = (id: string, children: React.ReactNode) =>
    wrapSection ? wrapSection(id, children) : children;

  return (
    <>
      <HeroSection />
      {section('platforms', <AppPlatforms />)}
      {section('features', <FeaturesSection />)}
      {section('how-it-works', <HowItWorks />)}
      {section('pricing', <PricingSection />)}
      {!isAuthenticated ? <CTASection /> : null}
      {section(
        'team',
        <>
          <TeamCarousel />
          <TeamWriteup />
        </>
      )}
      {section('footer', <AppFooter />)}
    </>
  );
}
