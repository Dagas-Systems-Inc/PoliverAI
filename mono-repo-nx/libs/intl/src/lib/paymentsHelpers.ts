import { Platform } from 'react-native'

const FALLBACK_API_BASE = 'https://poliverai.com'
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

  if (
    typeof window !== 'undefined' &&
    window.location?.origin &&
    !/localhost|127\.0\.0\.1/.test(window.location.origin)
  ) {
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
      success: `${apiBase}/payments/return?status=completed`,
      cancel: `${apiBase}/credits?status=failed`,
    }
  }

  const redirectUri = encodeURIComponent(buildNativePaymentReturnUrl())
  return {
    success: `${apiBase}/api/v1/checkout/finalize?redirect_uri=${redirectUri}`,
    cancel: buildNativePaymentReturnUrl(),
  }
}
