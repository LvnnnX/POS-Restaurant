export const TAX_RATE = 0.10;
export const TAX_LABEL = 'Tax';
export const CURRENCY = 'IDR';
export const SEARCH_DEBOUNCE_MS = 300;

// Format currency in IDR (Indonesian Rupiah)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
