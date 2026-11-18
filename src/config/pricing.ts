export const CURRENCY_STORAGE_KEY = 'monire-pricing-currency';
export const SUPPORTED_CURRENCIES = ['CHF', 'EUR', 'USD', 'CAD'] as const;

export type DisplayCurrency = typeof SUPPORTED_CURRENCIES[number];
export type PricingTabKey = 'webDesign' | 'automation';
export type WebDesignPlanKey = 'starter' | 'advanced' | 'premium';

type PriceValue =
  | { type: 'from'; amount: number }
  | { type: 'range'; min: number; max: number };

type WebDesignPriceMap = Record<WebDesignPlanKey, Record<DisplayCurrency, PriceValue>>;

export const WEB_DESIGN_PLAN_ORDER: WebDesignPlanKey[] = ['starter', 'advanced', 'premium'];

export const WEB_DESIGN_PRICES: WebDesignPriceMap = {
  starter: {
    CHF: { type: 'from', amount: 3500 },
    EUR: { type: 'from', amount: 3500 },
    USD: { type: 'from', amount: 4400 },
    CAD: { type: 'from', amount: 5500 },
  },
  advanced: {
    CHF: { type: 'from', amount: 6000 },
    EUR: { type: 'from', amount: 6000 },
    USD: { type: 'from', amount: 7500 },
    CAD: { type: 'from', amount: 9500 },
  },
  premium: {
    CHF: { type: 'from', amount: 9000 },
    EUR: { type: 'from', amount: 9000 },
    USD: { type: 'from', amount: 11000 },
    CAD: { type: 'from', amount: 14000 },
  },
};

export const isDisplayCurrency = (value: string | null): value is DisplayCurrency =>
  value !== null && SUPPORTED_CURRENCIES.includes(value as DisplayCurrency);

const formatAmount = (amount: number, currency: DisplayCurrency): string => {
  const withApostropheThousands = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  const withSpaceThousands = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const withCommaThousands = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (currency === 'CHF') {
    return `CHF ${withApostropheThousands(amount)}`;
  }

  if (currency === 'EUR') {
    return `€ ${withSpaceThousands(amount)}`;
  }

  if (currency === 'CAD') {
    return `C$ ${withCommaThousands(amount)}`;
  }

  return `$ ${withCommaThousands(amount)}`;
};

export const getWebDesignDisplayPrice = (
  planKey: WebDesignPlanKey,
  currency: DisplayCurrency,
): { prefix: string; amount: string } => {
  const price = WEB_DESIGN_PRICES[planKey][currency];

  if (price.type === 'from') {
    return { prefix: 'from ', amount: formatAmount(price.amount, currency) };
  }

  return { prefix: '', amount: `${formatAmount(price.min, currency)} - ${formatAmount(price.max, currency)}` };
};
