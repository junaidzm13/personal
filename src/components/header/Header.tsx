import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { fromPublic } from '../../utils/fromPublic';

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <BitmojiImageWrapper>
        <img src={fromPublic('bitmoji.jpeg')} alt="Junaid Malik's Bitmoji" />
      </BitmojiImageWrapper>
    </StyledHeader>
  );
};

const BitmojiImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 3em;
  border-radius: 5em;
  overflow: hidden;
  margin: 0.25em;
  margin-left: 0.5em;

  > img {
    height: 3em;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  background-color: ${colors.GRAY};
  width: 100%;
  overflow: hidden;
`;
