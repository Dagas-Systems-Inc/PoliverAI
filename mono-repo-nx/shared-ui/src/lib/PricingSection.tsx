import { useNavigation } from '@react-navigation/native';
import { CheckCircle2, Clock3, CreditCard } from 'lucide-react';
import { t } from '@poliverai/intl';

function copy(path: string, fallback: string) {
  const value = t(path, fallback);
  return typeof value === 'string' ? value : fallback;
}

const freePlan = [
  'Basic policy verification',
  'Rule-based compliance checks',
  'Fast analysis mode',
  'Basic recommendations',
];

const proPlan = [
  'Everything in Free',
  'AI-powered deep analysis',
  'Comprehensive reporting',
  'Policy generation & revision',
  'Priority support',
];

export default function PricingSection() {
  const navigation = useNavigation<any>();

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 2.85rem)', color: '#0f172a' }}>
          {copy('landing.pricing.title', 'Choose Your Plan')}
        </h2>
        <p style={{ margin: '12px auto 0', maxWidth: 720, color: '#475569', fontSize: 18, lineHeight: 1.6 }}>
          {copy(
            'landing.pricing.subtitle',
            'Start with our free tier or upgrade for advanced AI features'
          )}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22, maxWidth: 940, margin: '0 auto' }}>
        <div
          style={{
            borderRadius: 24,
            border: '1px solid rgba(226,232,240,0.95)',
            background: '#fff',
            padding: 28,
            boxShadow: '0 22px 50px rgba(15,23,42,0.06)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 30, color: '#0f172a' }}>{copy('landing.pricing.free_title', 'Free Tier')}</h3>
            <div style={{ marginTop: 10, fontSize: 44, fontWeight: 800, color: '#16a34a' }}>
              {copy('landing.pricing.free_price', '$0')}
            </div>
            <p style={{ marginTop: 8, color: '#64748b' }}>{copy('landing.pricing.free_desc', 'Perfect for getting started')}</p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gap: 12 }}>
            {freePlan.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#334155' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => navigation.navigate('Signup')}
            style={{
              marginTop: 24,
              width: '100%',
              borderRadius: 16,
              border: '1px solid rgba(148,163,184,0.35)',
              background: '#fff',
              padding: '14px 18px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              color: '#0f172a',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Clock3 size={16} />
            {copy('pricing.get_started_free', 'Get Started Free')}
          </button>
        </div>

        <div
          style={{
            borderRadius: 24,
            border: '1px solid rgba(37,99,235,0.18)',
            background: 'linear-gradient(180deg, rgba(239,246,255,0.96) 0%, #ffffff 100%)',
            padding: 28,
            boxShadow: '0 28px 60px rgba(37,99,235,0.12)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                borderRadius: 999,
                background: '#2563eb',
                color: '#fff',
                padding: '6px 12px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {copy('landing.pricing.popular', 'POPULAR')}
            </div>
            <h3 style={{ margin: '12px 0 0', fontSize: 30, color: '#0f172a' }}>{copy('landing.pricing.pro_title', 'Pro Tier')}</h3>
            <div style={{ marginTop: 10, fontSize: 44, fontWeight: 800, color: '#2563eb' }}>
              {copy('landing.pricing.pro_price', '$29')}
            </div>
            <p style={{ marginTop: 8, color: '#64748b' }}>{copy('landing.pricing.pro_period', 'per month')}</p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gap: 12 }}>
            {proPlan.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#334155' }}>
                <CheckCircle2 size={16} color="#2563eb" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => navigation.navigate('Login')}
            style={{
              marginTop: 24,
              width: '100%',
              border: 'none',
              borderRadius: 16,
              background: '#2563eb',
              padding: '14px 18px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 18px 45px rgba(37,99,235,0.2)',
            }}
          >
            <CreditCard size={16} />
            {copy('pricing.upgrade', 'Upgrade to Pro')}
          </button>
        </div>
      </div>
    </section>
  );
}
