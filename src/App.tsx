import React, { useLayoutEffect } from 'react';
import { Routes, Route, HashRouter, useLocation } from 'react-router-dom';
import { Header } from './components/header/Header';
import { AppContainer } from './AppContainer';
import { Footer } from './components/footer/Footer';
import { BlogsPage } from './components/pages/blog/BlogsPage';
import { BlogPost } from './components/pages/blog/BlogPost';
import { HomePage } from './components/pages/home/HomePage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {routesProps.map(r => (
          <Route
            key={r.path}
            path={r.path}
            element={<AppLayout>{r.element}</AppLayout>}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useScrollToTopOnPageChange();
  return (
    <AppContainer>
      <Header />
      {children}
      <Footer />
    </AppContainer>
  );
};

const routesProps: Array<{ path: string; element: JSX.Element }> = [
  { path: '/', element: <HomePage /> },
  { path: '/blogs', element: <BlogsPage /> },
  { path: '/blogs/:id', element: <BlogPost /> },
];

function useScrollToTopOnPageChange() {
  const { pathname } = useLocation();
  useLayoutEffect(() => document.documentElement.scrollTo(0, 0), [pathname]);
}
