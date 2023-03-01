// Import Third-party Modules
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import User-Defined Modules
import { IAppProps } from './types/App.interface';
import { GlobalStyle, Theme } from './common/commonStyles';
import { ThemeProvider } from 'styled-components';

/**
 * This component is the main app component where all the components are bundled
 * @returns Main App Component
 */
export const App: React.FC<IAppProps> = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Routes></Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
