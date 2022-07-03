import { ThemeProvider } from 'styled-components';

import GerundsInfinitives from './features/GerundsInfinitives';
import { theme } from './theme';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GerundsInfinitives />
    </ThemeProvider>
  );
}

export default App;
