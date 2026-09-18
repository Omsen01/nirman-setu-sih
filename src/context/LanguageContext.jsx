import { createContext, useContext, useState, useCallback } from 'react'

const LanguageContext = createContext(null)

export const LANGUAGES = [
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳', name: 'Hindi' },
  { code: 'en', label: 'English', flag: '🇬🇧', name: 'English' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳', name: 'Marathi' },
  { code: 'bn', label: 'বাংলা', flag: '🇮🇳', name: 'Bengali' },
]

const translations = {
  en: {
    appName: 'Nirman SETU',
    tagline: 'Every Skill. Every Person. Every Project.',
    login: 'Login',
    register: 'Register',
    language: 'Language',
    helpDesk: 'Help Desk',
    welcomeBack: 'Welcome Back',
    selectRole: 'Select Your Role',
    customerAdmin: 'Customer Admin',
    businessAdmin: 'Business Admin',
    transportation: 'Transportation',
    waterProject: 'Water Project',
    residentialProject: 'Residential Project',
    railwayProject: 'Railway Project',
    roadProject: 'Road Project',
    workerList: 'Worker List',
    viewProfile: 'View Profile',
    requestService: 'Request Service',
    contact: 'Contact',
    back: 'Back',
    home: 'Home',
    sendRequest: 'Send Request',
    callNow: 'Call Now',
    customerCare: 'Customer Care',
    needHelp: 'Need Help?',
  },
  hi: {
    appName: 'निर्माण सेतु',
    tagline: 'हर कौशल। हर व्यक्ति। हर परियोजना।',
    login: 'लॉगिन',
    register: 'पंजीकरण',
    language: 'भाषा',
    helpDesk: 'सहायता डेस्क',
    welcomeBack: 'वापसी पर स्वागत है',
    selectRole: 'अपनी भूमिका चुनें',
    customerAdmin: 'ग्राहक प्रशासक',
    businessAdmin: 'व्यवसाय प्रशासक',
    transportation: 'परिवहन',
    waterProject: 'जल परियोजना',
    residentialProject: 'आवासीय परियोजना',
    railwayProject: 'रेलवे परियोजना',
    roadProject: 'सड़क परियोजना',
    workerList: 'कार्यकर्ता सूची',
    viewProfile: 'प्रोफ़ाइल देखें',
    requestService: 'सेवा अनुरोध',
    contact: 'संपर्क करें',
    back: 'वापस',
    home: 'होम',
    sendRequest: 'अनुरोध भेजें',
    callNow: 'अभी कॉल करें',
    customerCare: 'ग्राहक सेवा',
    needHelp: 'मदद चाहिए?',
  },
  mr: {
    appName: 'निर्माण सेतू',
    tagline: 'प्रत्येक कौशल. प्रत्येक व्यक्ती. प्रत्येक प्रकल्प.',
    login: 'लॉगिन',
    register: 'नोंदणी',
    language: 'भाषा',
    helpDesk: 'मदत डेस्क',
    welcomeBack: 'पुन्हा स्वागत आहे',
    selectRole: 'तुमची भूमिका निवडा',
    customerAdmin: 'ग्राहक प्रशासक',
    businessAdmin: 'व्यवसाय प्रशासक',
    transportation: 'वाहतूक',
    waterProject: 'जल प्रकल्प',
    residentialProject: 'निवासी प्रकल्प',
    railwayProject: 'रेल्वे प्रकल्प',
    roadProject: 'रस्ता प्रकल्प',
    workerList: 'कामगार यादी',
    viewProfile: 'प्रोफाइल पहा',
    requestService: 'सेवा विनंती',
    contact: 'संपर्क',
    back: 'मागे',
    home: 'मुख्यपृष्ठ',
    sendRequest: 'विनंती पाठवा',
    callNow: 'आता कॉल करा',
    customerCare: 'ग्राहक सेवा',
    needHelp: 'मदत हवी आहे?',
  },
  bn: {
    appName: 'নির্মাণ সেতু',
    tagline: 'প্রতিটি দক্ষতা। প্রতিটি ব্যক্তি। প্রতিটি প্রকল্প।',
    login: 'লগইন',
    register: 'নিবন্ধন',
    language: 'ভাষা',
    helpDesk: 'সহায়তা ডেস্ক',
    welcomeBack: 'ফিরে আসার জন্য স্বাগতম',
    selectRole: 'আপনার ভূমিকা নির্বাচন করুন',
    customerAdmin: 'গ্রাহক প্রশাসক',
    businessAdmin: 'ব্যবসা প্রশাসক',
    transportation: 'পরিবহন',
    waterProject: 'জল প্রকল্প',
    residentialProject: 'আবাসিক প্রকল্প',
    railwayProject: 'রেল প্রকল্প',
    roadProject: 'সড়ক প্রকল্প',
    workerList: 'কর্মী তালিকা',
    viewProfile: 'প্রোফাইল দেখুন',
    requestService: 'সেবা অনুরোধ',
    contact: 'যোগাযোগ',
    back: 'ফিরে যান',
    home: 'হোম',
    sendRequest: 'অনুরোধ পাঠান',
    callNow: 'এখনই কল করুন',
    customerCare: 'গ্রাহক সেবা',
    needHelp: 'সাহায্য দরকার?',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('ns_lang') || 'en')

  const changeLanguage = useCallback((code) => {
    setLang(code)
    localStorage.setItem('ns_lang', code)
  }, [])

  const t = translations[lang] || translations.en

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}