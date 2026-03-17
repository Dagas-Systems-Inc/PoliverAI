import { Platform } from 'react-native'

const FALLBACK_API_BASE = 'http://localhost:8000'
export const POLIVERAI_DEEP_LINK_SCHEME = 'poliverai://'
export const POLIVERAI_PAYMENT_RETURN_PATH = 'payments/return'

export function getApiBaseOrigin(): string {
  try {
    const meta = import.meta as unknown as { env?: Record<string, unknown> }
    const viteEnv = meta?.env ?? {}
    const apiUrl = (viteEnv.VITE_API_BASE_URL ?? viteEnv.VITE_API_URL) as string | undefined
    if (apiUrl && apiUrl.trim() !== '') return apiUrl.replace(/\/$/, '')
  } catch (err) {
    void err
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return FALLBACK_API_BASE
}

export function buildNativePaymentReturnUrl() {
  return `${POLIVERAI_DEEP_LINK_SCHEME}${POLIVERAI_PAYMENT_RETURN_PATH}`
}

export function buildCheckoutUrls() {
  const apiBase = getApiBaseOrigin()

  if (Platform.OS === 'web') {
    return {
      success: `${apiBase}/api/v1/checkout/finalize`,
      cancel: `${apiBase}/credits`,
    }
  }

  const redirectUri = encodeURIComponent(buildNativePaymentReturnUrl())
  return {
    success: `${apiBase}/api/v1/checkout/finalize?redirect_uri=${redirectUri}`,
    cancel: buildNativePaymentReturnUrl(),
  }
}
