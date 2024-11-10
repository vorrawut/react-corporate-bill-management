import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { LanguageContextProvider } from './contexts/LanguageContext';
import { TranslationProvider } from './contexts/TranslationContext';
import AppRouter from './router/AppRouter';
import AppLayout from './components/layout/AppLayout';


const App: React.FC = () => (
  <Provider store={store}>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <TranslationProvider>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </TranslationProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </Provider>
);

export default App;