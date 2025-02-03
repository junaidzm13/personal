import React from 'react';
import { Introduction } from './introduction/Introduction';
import { TechnologiesCarouselContainer } from './carousel/TechnologiesCarouselContainer';
import { BlogsCarousel } from './work/BlogsCarousel';

export const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <Introduction />
      <BlogsCarousel />
      <TechnologiesCarouselContainer />
    </React.Fragment>
  );
};
