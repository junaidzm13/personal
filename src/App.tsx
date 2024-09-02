import React from 'react';
import { Header } from './header/Header';
import { AppContainer } from './AppContainer';
import { Introduction } from './introduction/Introduction';
import { Footer } from './footer/Footer';
import { TechnologiesCarouselContainer } from './carousel/TechnologiesCarouselContainer';

function App() {
  return (
    <AppContainer>
      <Header />
      <Introduction />
      <TechnologiesCarouselContainer />
      <Footer />
    </AppContainer>
  );
}

export default App;
