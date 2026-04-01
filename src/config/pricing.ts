export const CURRENCY_STORAGE_KEY = 'monire-pricing-currency';
export const SUPPORTED_CURRENCIES = ['CHF', 'EUR', 'USD'] as const;

export type DisplayCurrency = typeof SUPPORTED_CURRENCIES[number];
export type PricingTabKey = 'webDesign' | 'automation';
export type WebDesignPlanKey = 'starter' | 'advanced' | 'premium';

type PriceValue =
  | { type: 'from'; amount: number }
  | { type: 'range'; min: number; max: number };

type WebDesignPriceMap = Record<WebDesignPlanKey, Record<DisplayCurrency, PriceValue>>;

export const WEB_DESIGN_PLAN_ORDER: WebDesignPlanKey[] = ['starter', 'advanced', 'premium'];

// Manually curated, rounded values by currency (not live exchange-rate conversion).
export const WEB_DESIGN_PRICES: WebDesignPriceMap = {
  starter: {
    CHF: { type: 'from', amount: 3500 },
    EUR: { type: 'from', amount: 3500 },
    USD: { type: 'from', amount: 4400 },
  },
  advanced: {
    CHF: { type: 'from', amount: 6000 },
    EUR: { type: 'from', amount: 6000 },
    USD: { type: 'from', amount: 7500 },
  },
  premium: {
    CHF: { type: 'from', amount: 9000 },
    EUR: { type: 'from', amount: 9000 },
    USD: { type: 'from', amount: 11000 },
  },
};

const EUROZONE_COUNTRY_CODES = new Set([
  'AT', 'BE', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI',
  'ES', 'AD', 'MC', 'SM', 'VA', 'XK',
]);

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

export const detectCurrencyFromCountry = (countryCodeRaw: string | undefined): DisplayCurrency => {
  const countryCode = countryCodeRaw?.toUpperCase();
  if (countryCode === 'CH') return 'CHF';
  if (countryCode && EUROZONE_COUNTRY_CODES.has(countryCode)) return 'EUR';
  return 'USD';
};

export const detectCurrencyFromTimezone = (timezoneRaw: string | undefined): DisplayCurrency => {
  const timezone = timezoneRaw ?? '';
  if (timezone === 'Europe/Zurich') return 'CHF';
  if (timezone.startsWith('Europe/')) return 'EUR';
  return 'USD';
};
