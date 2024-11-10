import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import i18n from '../i18n';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageHelper';

interface LanguageContextType {
    language: string;
    changeLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize language from localStorage or default to 'en'
    const [language, setLanguage] = useState<string>(() => {
        const storedLanguage = loadFromLocalStorage<string>('appLanguage');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        // Change i18n language when language state changes
        i18n.changeLanguage(language).catch((error) => {
            console.error('Error changing language:', error);
        });
        // Save the language to localStorage whenever it changes
        saveToLocalStorage('appLanguage', language);
    }, [language]);

    const changeLanguage = (newLanguage: string) => {
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageContextProvider');
    }
    return context;
};
