import { StyleSheet } from 'react-native'

// Single clean RN tokens file used by shared-ui. Keep small and extend as
// needed while porting web components to React Native.
const tokens = {
  textSizes: {
    xs: { size: 12 },
    sm: { size: 14 },
    md: { size: 16 },
    lg: { size: 18 },
    xl: { size: 20 },
    '2xl': { size: 24 },
    '3xl': { size: 30 },
    '5xl': { size: 48 },
  },
  fontWeights: {
    bold: { weight: '700' },
    semibold: { weight: '600' },
    medium: { weight: '500' },
    normal: { weight: '400' },
  },
  colors: {
    // semantic
    textPrimary: { hex: '#111827' },
    textSecondary: { hex: '#374151' },
    textMuted: { hex: '#4B5563' },
    surface: { hex: '#FFFFFF' },
    surfaceMuted: { hex: '#F3F4F6' },
    pageBg: { hex: '#FAFAFA' },
    primary: { hex: '#2563EB' },
    primaryBg: { hex: '#2563EB' },
    primaryBgLight: { hex: '#DBEAFE' },
    success: { hex: '#16A34A' },
    danger: { hex: '#DC2626' },
    dangerBg: { hex: '#FEE2E2' },
    mutedText: { hex: '#9CA3AF' },
    mutedBorder: { hex: '#E5E7EB' },
    // palette aliases used by various components
    white: { hex: '#FFFFFF' },
    red600: { hex: '#DC2626' },
    blue100: { hex: '#DBEAFE' },
    gray600: { hex: '#4B5563' },
    ctaText: { hex: '#FFFFFF' },
    onPrimary: { hex: '#FFFFFF' },
  },
  spacing: {
    card: 16,
    sectionPaddingY: 64,
    small: 8,
    medium: 16,
    large: 24,
    formRow: 16,
    cardDefault: 12,
    iconMd: 24,
  },
  buttons: {
    base: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
    small: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  },
  fontPresets: {
    heading: { size: '5xl', weight: 'bold' },
    subheading: { size: '3xl', weight: 'semibold' },
    lead: { size: 'xl', weight: 'medium' },
    body: { size: 'md', weight: 'normal' },
    small: { size: 'sm', weight: 'normal' },
  },
}

function mapSize(sizeToken: any) {
  if (!sizeToken || typeof sizeToken !== 'object') return undefined
  if (typeof sizeToken.size === 'number') return sizeToken.size
  return undefined
}

export const rnStyleFromTokens = (opts: { size?: keyof typeof tokens.textSizes | keyof typeof tokens.fontPresets | null, color?: keyof typeof tokens.colors | null, weight?: keyof typeof tokens.fontWeights | null, lineHeight?: number | null } = {}) => {
  const s: any = {}
  // allow preset or direct size key
  if (opts.size && (opts.size as string) in tokens.fontPresets) {
    const preset = (tokens as any).fontPresets[opts.size as string]
    if (preset && preset.size) {
      const f = tokens.textSizes[preset.size as keyof typeof tokens.textSizes]
      const size = mapSize(f)
      if (typeof size === 'number') s.fontSize = size
    }
    if (preset && preset.weight) {
      const w = tokens.fontWeights[preset.weight as keyof typeof tokens.fontWeights]
      if (w && w.weight) s.fontWeight = w.weight
    }
  } else if (opts.size) {
    const f = tokens.textSizes[opts.size as keyof typeof tokens.textSizes]
    const size = mapSize(f)
    if (typeof size === 'number') s.fontSize = size
  }

  if (opts.weight) {
    const w = tokens.fontWeights[opts.weight]
    if (w && w.weight) s.fontWeight = w.weight
  }
  if (opts.color) {
    const c = tokens.colors[opts.color]
    if (c && c.hex) s.color = c.hex
  }
  if (opts.lineHeight) s.lineHeight = opts.lineHeight
  return StyleSheet.create({ base: s }).base
}

export const rnTokens = tokens

// Convenience aliases used throughout the RN app to match earlier styleTokens exports
export const colors = tokens.colors
export const textSizes = {
  h1: { size: tokens.textSizes['5xl'].size },
  h2: { size: tokens.textSizes['3xl'].size },
  h3: { size: tokens.textSizes['2xl'].size },
  md: { size: tokens.textSizes.md.size },
  sm: { size: tokens.textSizes.sm.size },
}
export const spacing = {
  pageBg: { value: tokens.spacing.card },
}

// Helper: accept a token key (eg 'white'), a token object ({ hex: '#fff' }), or
// a raw hex string and return a hex ColorValue usable by RN color props.
export const colorFromToken = (input?: string | { hex?: string } | null): string | undefined => {
  if (!input) return undefined
  // raw hex string
  if (typeof input === 'string') {
    if (input.startsWith('#')) return input
    // treat as token key
    const t = (tokens.colors as any)[input]
    if (t && typeof t.hex === 'string') return t.hex
    return undefined
  }
  // token object
  if (typeof input === 'object' && typeof (input as any).hex === 'string') return (input as any).hex
  return undefined
}

export default rnStyleFromTokens
