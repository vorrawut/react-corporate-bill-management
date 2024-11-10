import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { ThemeContextProvider } from './contexts/ThemeContext';
import InnerApp from './components/InnerApp';

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeContextProvider>
      <InnerApp />
    </ThemeContextProvider>
  </Provider>
);

export default App;