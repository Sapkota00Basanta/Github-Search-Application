// Import Third-party Modules
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Import User-Defined Modules
import { IAppProps } from './types/App.interface';
import { GlobalStyle, Theme } from './common/CommonStyles';
import { ThemeProvider } from 'styled-components';
import { Error } from './components/Error';
import { Search } from './components/Search';
import { RepositoryDetail } from './components/RepositoryDetail';
import { Home } from './components/Home';

/**
 * This component is the main app component where all the components are bundled
 * @returns Main App Component
 */
export const App: React.FC<IAppProps> = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/error" element={<Error />} />
          <Route path="/repository/*" element={<RepositoryDetail />} />
          <Route path="/search/:q" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
