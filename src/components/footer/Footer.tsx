import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { fromPublic } from '../../utils/fromPublic';

export const Footer: React.FC = () => (
  <Wrapper>
    <img src={fromPublic('technologies/react.png')} alt="React Logo" />
    <span>Built with React</span>
    <span>— © 2024, Junaid Malik</span>
  </Wrapper>
);

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  gap: 0.25em;
  background-color: ${colors.GRAY};
  color: ${colors.LEAD};

  > img {
    width: 2em;
  }
`;
