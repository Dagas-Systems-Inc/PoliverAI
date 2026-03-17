const FALLBACK_API_BASE = 'https://poliverai.com'

export function getApiBaseOrigin(): string {
  try {
    const meta = import.meta as unknown as { env?: Record<string, unknown> }
    const viteEnv = meta?.env ?? {}
    const apiUrl = (viteEnv.VITE_API_BASE_URL ?? viteEnv.VITE_API_URL ?? process.env.VITE_API_URL ?? process.env.API_BASE) as string | undefined
    if (apiUrl && apiUrl.trim() !== '') return apiUrl.replace(/\/$/, '')
  } catch {
    // Fall through to runtime-based detection.
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
