import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalStyles';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Lists from './pages/Lists';
import dark from './styles/themes/dark';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Layout>
        <Lists />
      </Layout>
    </ThemeProvider>
  );
}

export default App;