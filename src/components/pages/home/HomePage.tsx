import React from 'react';
import { Introduction } from './introduction/Introduction';
import { TechnologiesCarouselContainer } from './carousel/TechnologiesCarouselContainer';

export const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <Introduction />
      <TechnologiesCarouselContainer />
    </React.Fragment>
  );
};
