import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { LanguageContextProvider } from './contexts/LanguageContext';
import InnerApp from './features/common/InnerApp';


const App: React.FC = () => (
  <Provider store={store}>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <InnerApp />
      </LanguageContextProvider>
    </ThemeContextProvider>
  </Provider>
);

export default App;