export type CreditsSummaryValues = {
  subscriptionUsd: number
  purchasedUsd: number
  spentUsd: number
}

export default function useCreditsSummary(subscriptionCredits: number, purchasedCredits: number, totalSpentCredits: number): CreditsSummaryValues {
  // Simple conversion for now: assume 1 credit = $1 for a placeholder.
  return {
    subscriptionUsd: subscriptionCredits,
    purchasedUsd: purchasedCredits,
    spentUsd: totalSpentCredits,
  }
}
