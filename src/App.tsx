import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { LanguageContextProvider } from './contexts/LanguageContext';
import InnerApp from './features/common/InnerApp';
import { TranslationProvider } from './contexts/TranslationContext';


const App: React.FC = () => (
  <Provider store={store}>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <TranslationProvider>
          <InnerApp />
        </TranslationProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </Provider>
);

export default App;