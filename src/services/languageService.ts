
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

export const languages: Record<string, Language> = {
  fr: {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    nativeName: 'العربية',
    flag: '🇹🇳',
    rtl: true
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false
  }
};

export const translations = {
  fr: {
    dashboard: 'Tableau de bord',
    journals: 'Journaux',
    accounts: 'Comptes',
    settings: 'Paramètres',
    amount: 'Montant',
    date: 'Date',
    description: 'Description',
    reference: 'Référence',
    debitAccount: 'Compte débit',
    creditAccount: 'Compte crédit',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    newEntry: 'Nouvelle écriture',
    currency: 'Devise',
    language: 'Langue',
    companyRevenue: 'Chiffre d\'affaires',
    treasury: 'Trésorerie',
    receivables: 'Créances clients',
    payables: 'Dettes fournisseurs',
    chartOfAccounts: 'Plan comptable',
    accountManagement: 'Gestion des comptes et du plan comptable',
    newAccount: 'Nouveau compte',
    totalAccounts: 'Total comptes',
    activeInPlan: 'Actifs dans le plan',
    totalAssets: 'Actif total',
    totalLiabilities: 'Passif total',
    balance: 'Équilibre',
    accountCode: 'Code',
    accountName: 'Nom du compte',
    category: 'Catégorie',
    type: 'Type',
    movements: 'Mouvements',
    actions: 'Actions',
    all: 'Tous',
    assets: 'Actif',
    liabilities: 'Passif',
    revenue: 'Produits',
    expenses: 'Charges'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    journals: 'السجلات',
    accounts: 'الحسابات',
    settings: 'الإعدادات',
    amount: 'المبلغ',
    date: 'التاريخ',
    description: 'الوصف',
    reference: 'المرجع',
    debitAccount: 'حساب المدين',
    creditAccount: 'حساب الدائن',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    newEntry: 'قيد جديد',
    currency: 'العملة',
    language: 'اللغة',
    companyRevenue: 'رقم الأعمال',
    treasury: 'الخزينة',
    receivables: 'ذمم العملاء',
    payables: 'ذمم الموردين',
    chartOfAccounts: 'دليل الحسابات',
    accountManagement: 'إدارة الحسابات ودليل الحسابات',
    newAccount: 'حساب جديد',
    totalAccounts: 'إجمالي الحسابات',
    activeInPlan: 'نشطة في الخطة',
    totalAssets: 'إجمالي الأصول',
    totalLiabilities: 'إجمالي الخصوم',
    balance: 'الرصيد',
    accountCode: 'الرمز',
    accountName: 'اسم الحساب',
    category: 'الفئة',
    type: 'النوع',
    movements: 'الحركات',
    actions: 'الإجراءات',
    all: 'الكل',
    assets: 'الأصول',
    liabilities: 'الخصوم',
    revenue: 'الإيرادات',
    expenses: 'المصروفات'
  },
  en: {
    dashboard: 'Dashboard',
    journals: 'Journals',
    accounts: 'Accounts',
    settings: 'Settings',
    amount: 'Amount',
    date: 'Date',
    description: 'Description',
    reference: 'Reference',
    debitAccount: 'Debit Account',
    creditAccount: 'Credit Account',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    newEntry: 'New Entry',
    currency: 'Currency',
    language: 'Language',
    revenue: 'Revenue',
    treasury: 'Treasury',
    receivables: 'Receivables',
    payables: 'Payables'
  },
  de: {
    dashboard: 'Dashboard',
    journals: 'Buchungsbelege',
    accounts: 'Konten',
    settings: 'Einstellungen',
    amount: 'Betrag',
    date: 'Datum',
    description: 'Beschreibung',
    reference: 'Referenz',
    debitAccount: 'Sollkonto',
    creditAccount: 'Habenkonto',
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    newEntry: 'Neuer Eintrag',
    currency: 'Währung',
    language: 'Sprache',
    revenue: 'Umsatz',
    treasury: 'Kasse',
    receivables: 'Forderungen',
    payables: 'Verbindlichkeiten'
  }
};

class LanguageService {
  private currentLanguage: string = 'fr';

  setLanguage(langCode: string) {
    if (languages[langCode]) {
      this.currentLanguage = langCode;
      localStorage.setItem('selectedLanguage', langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = languages[langCode].rtl ? 'rtl' : 'ltr';
    }
  }

  getCurrentLanguage(): Language {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved && languages[saved]) {
      this.currentLanguage = saved;
    }
    return languages[this.currentLanguage];
  }

  translate(key: string): string {
    const currentTranslations = translations[this.currentLanguage as keyof typeof translations];
    return currentTranslations?.[key as keyof typeof currentTranslations] || key;
  }

  getAllLanguages(): Language[] {
    return Object.values(languages);
  }
}

export default new LanguageService();
