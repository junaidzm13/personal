import React from 'react';
import styled from 'styled-components';
import { fromPublic } from '../utils/fromPublic';

export const ProfilePicture: React.FC = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src={fromPublic('bitmoji2.jpeg')} alt="Junaid's bitmoji-2" />
      </ImageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 17em;
  width: 17em;
  border-radius: 30em;
  overflow: hidden;

  > img {
    height: 40em;
    margin-top: 10em;
  }
`;
