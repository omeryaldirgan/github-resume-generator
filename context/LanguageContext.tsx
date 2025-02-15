type Language = 'en' | 'tr' | 'es' | 'de' | 'fr';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}; 