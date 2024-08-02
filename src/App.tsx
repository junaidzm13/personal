import React from 'react';
import { Header } from './header/Header';
import { AppContainer } from './AppContainer';
import { Introduction } from './introduction/Introduction';

function App() {
  return (
    <AppContainer>
      <Header />
      <Introduction />
    </AppContainer>
  );
}

export default App;
