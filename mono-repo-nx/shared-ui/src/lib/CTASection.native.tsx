import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '@poliverai/intl'
import { Button } from './Button/Button'

export default function CTASection() {
  const navigation = useNavigation<any>()
  const { isAuthenticated } = useAuth()

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Ready to bring the native app back in line?</Text>
      <Text style={styles.lead}>
        Keep the same structure, responsive logic, and payment completion result across every surface.
      </Text>
      <Button
        title={isAuthenticated ? 'Open dashboard' : 'Create account'}
        size="lg"
        onPress={() => navigation.navigate(isAuthenticated ? 'Dashboard' : 'Signup')}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 20,
    marginVertical: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#0F172A',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  lead: {
    marginTop: 10,
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: '#2563EB',
    minWidth: 220,
  },
})
