import React, { useState } from 'react';
import AppTopNav from '../../components/AppTopNav';
import LandingScreenContent from './LandingScreenContent';

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background:
    'linear-gradient(180deg, #eff6ff 0%, #f8fbff 16%, #ffffff 34%, #f8fafc 100%)',
  color: '#0f172a',
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

export default function LandingScreen() {
	const [showSplash, setShowSplash] = useState(true);

	return (
		<div style={pageStyle}>
      <AppTopNav currentRoute="landing" />
      <LandingScreenContent
        showSplash={showSplash}
        onSplashFinish={() => setShowSplash(false)}
        wrapSection={(id, children) => <div id={id}>{children}</div>}
      />
		</div>
	);
}
