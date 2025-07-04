
import { useState } from 'react';
import currencyService, { Currency } from '../services/currencyService';

export const useCurrency = () => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    currencyService.getCurrentCurrency()
  );

  const changeCurrency = (currencyCode: string) => {
    currencyService.setCurrency(currencyCode);
    setCurrentCurrency(currencyService.getCurrentCurrency());
  };

  const formatAmount = (amount: number, currencyCode?: string): string => {
    return currencyService.formatAmount(amount, currencyCode);
  };

  return {
    currentCurrency,
    changeCurrency,
    formatAmount,
    allCurrencies: currencyService.getAllCurrencies()
  };
};
