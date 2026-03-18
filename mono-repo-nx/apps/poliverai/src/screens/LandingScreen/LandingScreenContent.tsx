import React from 'react';
import { Platform } from 'react-native';
import { useAuth } from '@poliverai/intl';
import {
  Splash,
  HeroSection,
  FeaturesSection,
  Footer,
  TeamCarousel,
  AppPlatforms,
  HowItWorks,
  PricingSection,
  CTASection,
  TeamWriteup,
} from '@poliverai/shared-ui';
import AppFooter from '../../components/AppFooter';
import poliveraiSplash from '../../../assets/lottie-animations/poliverai-splash.json';

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

  const section = (id: string, children: React.ReactNode) =>
    wrapSection ? wrapSection(id, children) : children;

  return (
    <>
      {showSplash ? (
        <Splash
          onFinish={onSplashFinish}
          source={Platform.OS === 'web' ? undefined : poliveraiSplash}
          delayMs={200}
          durationMs={5000}
        />
      ) : null}
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
      {Platform.OS === 'web' ? (
        <Footer hasBackground={true} />
      ) : (
        section('footer', <AppFooter />)
      )}
    </>
  );
}
