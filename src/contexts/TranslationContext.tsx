// src/contexts/TranslationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// Create a context to store the translation function (`t`)
const TranslationContext = createContext<(key: string) => string>(() => '');

// Define the props for TranslationProvider
interface TranslationProviderProps {
    children: ReactNode; // Ensure `children` is properly typed
}

// Create the provider component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
    const { t } = useTranslation<'translation'>();

    return (
        <TranslationContext.Provider value={t}>
            {children}
        </TranslationContext.Provider>
    );
};

// Create a custom hook to use the `t` function from anywhere in the app
export const useGlobalTranslation = () => {
    return useContext(TranslationContext);
};
