import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { colors, twFromTokens } from '@poliverai/shared-ui';
import AppTopNav from '../../components/AppTopNav';
import LandingScreenContent from './LandingScreenContent';

export default function LandingScreen() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ScrollView style={twFromTokens('min-h-screen', colors.pageGradient)}>
      <AppTopNav currentRoute="landing" />
      <LandingScreenContent
        showSplash={showSplash}
        onSplashFinish={() => setShowSplash(false)}
      />
    </ScrollView>
  );
}
