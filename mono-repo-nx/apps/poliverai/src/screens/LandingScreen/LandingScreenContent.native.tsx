import React from 'react';
import { useAuth } from '@poliverai/intl';
import {
  HeroSection,
  FeaturesSection,
  Footer,
  AppPlatforms,
  HowItWorks,
  PricingSection,
  CTASection,
} from '@poliverai/shared-ui';

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
      <Footer hasBackground={true} />
    </>
  );
}
