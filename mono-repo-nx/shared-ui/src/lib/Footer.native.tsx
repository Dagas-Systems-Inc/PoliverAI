import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface FooterProps {
  hasBackground?: boolean
}

export default function Footer({ hasBackground = false }: FooterProps) {
  return (
    <View style={[styles.footer, hasBackground && styles.footerBackground]}>
      <Text style={styles.text}>© 2026 PoliverAI. Shared React Native UI across mobile, tablet, and web.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  footerBackground: {
    backgroundColor: '#EFF6FF',
  },
  text: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 13,
    lineHeight: 20,
  },
})
