import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAuth } from '@poliverai/intl';
import { transactionsService, PaymentsService, t } from '@poliverai/intl';
import { colors, textSizes, colorFromToken, CreditsSummary } from '@poliverai/shared-ui';
import { Button } from '@poliverai/shared-ui';
import { useCreditsSummary } from '@poliverai/intl';
import type { Transaction } from '@poliverai/intl';

// Placeholder for TransactionList and TransactionFilters
// You should port these as RN components and add them to shared-ui
const TransactionList = () => <View><Text>Transaction List (RN version needed)</Text></View>;
const TransactionFilters = () => <View><Text>Transaction Filters (RN version needed)</Text></View>;

type CreditsRouteParams = {
  session_id?: string;
  status?: string;
};

const CreditsScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, CreditsRouteParams | undefined>, string>>();
  const { user, isAuthenticated, loading, refreshUser } = useAuth();
  const [items, setItems] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Removed unused modal, search, filter, pagination state for RN port
  const [totalSpentCredits, setTotalSpentCredits] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(Dimensions.get('window').width <= 1140);

  useEffect(() => {
    const updateMobile = () => setIsMobile(Dimensions.get('window').width <= 1140);
    Dimensions.addEventListener('change', updateMobile);
    // No removeEventListener for Dimensions in RN, so skip cleanup
  }, []);

  const fetchTx = useCallback(async () => {
    setIsLoading(true);
    try {
      const r = await transactionsService.listTransactions({});
      setItems(r.transactions || []);
      setTotalSpentCredits(r.total_spent_credits ?? 0);
    } catch {
      setError(t('credits.failed_to_load_transactions'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTx();
  }, [fetchTx]);

  useEffect(() => {
    const status = route.params?.status;
    const sessionId = route.params?.session_id;
    if (!status) return;

    PaymentsService.handlePaymentReturn({ status, session_id: sessionId }).catch(() => undefined);
    if (refreshUser) refreshUser().catch(() => undefined);
    fetchTx().catch(() => undefined);

    const title = status === 'completed' ? 'Payment completed' : 'Payment failed';
    const message =
      status === 'completed'
        ? 'Your purchase was applied and your account is being refreshed.'
        : 'The checkout did not complete. You can try again from this screen.';
    Alert.alert(title, message);
  }, [fetchTx, refreshUser, route.params?.session_id, route.params?.status]);

  const purchasedCredits = user?.credits ?? 0;
  // If you have a subscription credits field, use it here; otherwise, set to 0
  const subscriptionCredits = 0;
  const { subscriptionUsd, purchasedUsd, spentUsd } = useCreditsSummary(subscriptionCredits, purchasedCredits, totalSpentCredits);

  // Filtered transactions (simplified for RN)
  const filtered = useMemo(() => items, [items]);

  if (loading || isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colorFromToken(colors.primary)} />
        <Text style={styles.loadingText}>{t('credits.loading')}</Text>
      </View>
    );
  }
  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{t('policy_analysis.not_authenticated_message')}</Text>
        <Button title={t('auth.register.sign_in')} onPress={() => console.log('Sign in pressed')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('credits.transaction_history_title')}</Text>
      <CreditsSummary
        isCompactUnderHeader={false}
        statsLoaded={true}
        animatedTop={{ subscriptionCredits, purchasedCredits, totalSpent: totalSpentCredits }}
        subscriptionUsd={subscriptionUsd}
        purchasedUsd={purchasedUsd}
        spentUsd={spentUsd}
        total={subscriptionCredits + purchasedCredits}
        mobileCompact={isMobile}
      />
      {/* Transaction filters and list would be ported as RN components */}
      <TransactionFilters />
      <TransactionList />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Buy 100 credits" onPress={() => { PaymentsService.purchaseCredits(10).catch((err) => setError(err instanceof Error ? err.message : String(err))) }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colorFromToken(colors.pageBg) as string,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  backgroundColor: colorFromToken(colors.pageBg) as string,
  },
  title: {
    fontSize: textSizes.h2.size,
  color: colorFromToken(colors.textPrimary) as string,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: textSizes.md.size,
  color: colorFromToken(colors.textMuted) as string,
    marginTop: 12,
  },
  error: {
  color: colorFromToken(colors.danger) as string,
    fontSize: textSizes.md.size,
    marginVertical: 12,
    textAlign: 'center',
  },
  addCreditsBtn: {
    marginTop: 24,
  backgroundColor: colorFromToken(colors.primaryBg) as string,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addCreditsText: {
  color: colorFromToken(colors.ctaText) as string,
    fontSize: textSizes.md.size,
    fontWeight: '600',
  },
});

export default CreditsScreen;
