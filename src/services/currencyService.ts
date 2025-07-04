
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  decimalPlaces: number;
}

export const currencies: Record<string, Currency> = {
  TND: {
    code: 'TND',
    symbol: 'د.ت',
    name: 'Dinar Tunisien',
    decimalPlaces: 3
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    decimalPlaces: 2
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dollar Américain',
    decimalPlaces: 2
  }
};

class CurrencyService {
  private currentCurrency: string = 'TND';

  setCurrency(currencyCode: string) {
    if (currencies[currencyCode]) {
      this.currentCurrency = currencyCode;
      localStorage.setItem('selectedCurrency', currencyCode);
    }
  }

  getCurrentCurrency(): Currency {
    const saved = localStorage.getItem('selectedCurrency');
    if (saved && currencies[saved]) {
      this.currentCurrency = saved;
    }
    return currencies[this.currentCurrency];
  }

  formatAmount(amount: number, currencyCode?: string): string {
    const currency = currencyCode ? currencies[currencyCode] : this.getCurrentCurrency();
    
    // Format spécifique pour TND avec 3 décimales
    if (currency.code === 'TND') {
      return `${amount.toFixed(currency.decimalPlaces)} ${currency.symbol}`;
    }

    // Format international pour autres devises
    const formatter = new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: currency.decimalPlaces,
      maximumFractionDigits: currency.decimalPlaces
    });

    return formatter.format(amount);
  }

  getAllCurrencies(): Currency[] {
    return Object.values(currencies);
  }
}

export default new CurrencyService();
