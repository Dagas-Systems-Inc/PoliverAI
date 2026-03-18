/* eslint-disable @typescript-eslint/no-explicit-any */
// Shared splash component that avoids static, native-only imports so it can be
// used by both web (Vite) and React Native. Do not import Expo or app assets
// from here. A calling app should pass a `source` prop for the animation.
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet, Text } from 'react-native';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface SplashProps {
  onFinish?: () => void;
  source?: unknown;
  duration?: number;
  // legacy aliases used by some callers
  delayMs?: number;
  durationMs?: number;
}

// Runtime guard helpers
const isWeb = typeof globalThis !== 'undefined' && typeof (globalThis as any).document !== 'undefined';
const isReactNative = !isWeb;

const tryRequire = (name: string) => {
  try {
    // Use eval to avoid static analysis by web bundlers.
    // eslint-disable-next-line no-eval, @typescript-eslint/no-implied-eval
    // @ts-ignore
    return eval('require')(name);
  } catch (e) {
    return null;
  }
};

const LottieView: any = isReactNative ? tryRequire('lottie-react-native') : null;
const NativeAnimatedLogo =
  isReactNative
    ? (tryRequire('../../../../apps/poliverai/assets/brand/poliverai-icon-transparent.svg')?.default ?? null)
    : null;

export const Splash: React.FC<SplashProps> = ({ onFinish, source, duration = 4000, delayMs, durationMs }) => {
  const animRef = useRef<any>(null);
  const fallbackScale = useRef(new Animated.Value(0.9)).current;
  const fallbackOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simple in-app splash timing; do not call any Expo/native API here.
    const ms = typeof durationMs === 'number' ? durationMs : (typeof delayMs === 'number' ? delayMs : duration)
    const timer = setTimeout(() => {
      if (typeof onFinish === 'function') onFinish();
    }, ms);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  useEffect(() => {
    if (!isReactNative || LottieView || !NativeAnimatedLogo) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fallbackOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fallbackScale, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fallbackOpacity, {
            toValue: 0.82,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fallbackScale, {
            toValue: 1.05,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [fallbackOpacity, fallbackScale]);

  // If Lottie is available (native), render it. Otherwise render a simple web fallback.
  if (LottieView && source) {
    return (
      <View style={[styles.container, styles.pointerEventsNone]}>
        <LottieView
          ref={animRef}
          source={source as any}
          autoPlay
          loop={false}
          speed={0.95}
          style={styles.lottie}
          resizeMode="contain"
        />
      </View>
    );
  }

  if (isWeb) {
    return (
      <div style={webOverlayStyle}>
        <div style={webInnerStyle}>
          <DotLottieReact
            src="https://lottie.host/60d101b5-d7e9-4e51-8c0c-2624f51e642a/sGDt58V29f.lottie"
            autoplay
            style={webPlayerStyle}
          />
        </div>
      </div>
    );
  }

  if (NativeAnimatedLogo) {
    return (
      <View style={[styles.container, styles.pointerEventsNone]}>
        <Animated.View
          style={{
            opacity: fallbackOpacity,
            transform: [{ scale: fallbackScale }],
          }}
        >
          <NativeAnimatedLogo width={180} height={180} />
        </Animated.View>
        <Text style={styles.brand}>PoliverAI</Text>
      </View>
    );
  }

  // Native fallback rendering
  return (
    <View style={[styles.container, styles.pointerEventsNone]}>
      <Text style={styles.mark}>P</Text>
      <Text style={styles.brand}>PoliverAI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  mark: {
    width: 72,
    height: 72,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 34,
    fontWeight: '800',
    overflow: 'hidden',
    includeFontPadding: false,
    lineHeight: 72,
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
});

const webOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  pointerEvents: 'none',
};

const webInnerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'min(360px, 70vw)',
};

const webPlayerStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  maxWidth: '70vw',
  maxHeight: '70vh',
  filter: 'drop-shadow(0 20px 45px rgba(15, 23, 42, 0.08))',
};

export default Splash;
