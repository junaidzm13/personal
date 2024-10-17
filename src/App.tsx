import React from 'react';
import { Header } from './components/header/Header';
import { AppContainer } from './AppContainer';
import { Introduction } from './introduction/Introduction';
import { Footer } from './components/footer/Footer';
import { TechnologiesCarouselContainer } from './carousel/TechnologiesCarouselContainer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { BlogsPage } from './components/pages/blog/BlogsPage';
import { BlogPost } from './components/pages/blog/BlogPost';

export default function App() {
  return (
    <AppContainer>
      <Header />
      <BrowserRouter basename="/website">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AppContainer>
  );
}

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <Introduction />
      <TechnologiesCarouselContainer />
    </React.Fragment>
  );
};
