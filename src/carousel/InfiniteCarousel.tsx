import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

export type CarouselImage = { src: string; alt: string };

interface Props {
  imgs: Array<CarouselImage>;
  imgHeightEm?: number;
}

export const InfiniteCarousel: React.FC<Props> = props => {
  return (
    <Wrapper imgHeightEm={props.imgHeightEm}>
      <Logos {...props} />
      <Logos {...props} />
    </Wrapper>
  );
};

const Logos: React.FC<Props> = ({ imgs }) => {
  return (
    <div className="logos-slide">
      {imgs.map(i => (
        <img src={i.src} alt={i.alt} />
      ))}
    </div>
  );
};

const animation = keyframes`
    from {transform: translateX(0);}
    to {transform: translateX(-100%);}
`;

const Wrapper = styled.div<Pick<Props, 'imgHeightEm'>>`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 1em 0;
  background-color: white;
  white-space: nowrap;
  position: relative;

  &:before,
  &:after {
    position: absolute;
    top: 0;
    width: 10%;
    height: 100%;
    content: '';
    z-index: 2;
  }

  &:before {
    left: 0;
    background: linear-gradient(to left, rgb(255, 255, 255, 0), white);
  }

  &:after {
    right: 0;
    background: linear-gradient(to right, rgb(255, 255, 255, 0), white);
  }

  &:hover .logos-slide {
    animation-play-state: paused;
  }

  > .logos-slide {
    display: inline-block;
    animation: 20s ${animation} infinite linear;
    > img {
      height: ${props => props.imgHeightEm ?? 4}em;
      margin: 0 1.25em;
    }
  }
`;
