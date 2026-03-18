import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AppTopNav from '../../components/AppTopNav';
import LandingScreenContent from './LandingScreenContent';

export default function LandingScreen() {
  console.error('[startup] LandingScreen.native render');

  return (
    <SafeAreaView style={styles.page}>
      <AppTopNav currentRoute="landing" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <LandingScreenContent
            showSplash={false}
            onSplashFinish={() => undefined}
            wrapSection={(id, children) => <View key={id}>{children}</View>}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8fbff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fbff',
  },
  content: {
    paddingBottom: 32,
  },
  inner: {
    flex: 1,
  },
});
