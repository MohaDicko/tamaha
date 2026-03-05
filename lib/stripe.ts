export const CURRENCY = 'eur';
export const MIN_AMOUNT = 5.0;
export const MAX_AMOUNT = 10000.0;
export const AMOUNT_STEP = 5.0;

export function formatAmountForDisplay(
    amount: number,
    currency: string
): string {
    let numberFormat = new Intl.NumberFormat(['fr-FR'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    return numberFormat.format(amount);
}

export function formatAmountForStripe(
    amount: number,
    currency: string
): number {
    const numberFormat = new Intl.NumberFormat(['fr-FR'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    const parts = numberFormat.formatToParts(amount);
    let zeroDecimalCurrency: boolean = true;
    for (let part of parts) {
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
