import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';
import { ContactDetails } from './ConactDetails';
import { NameAndSummary } from './NameAndSummary';
import { ProfilePicture } from './ProfilePicture';
import { MAX_WIDTH } from '../constants/layout';

export const Introduction: React.FC = () => {
  return (
    <IntroductionWrapper>
      <InfoWrapper>
        <NameAndSummary />
        <ContactDetails />
      </InfoWrapper>
      <ProfilePicture />
    </IntroductionWrapper>
  );
};

const IntroductionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${colors.GRAY};
  gap: 3em;
  padding: 3em 1em 3em;

  @media (max-width: ${MAX_WIDTH}) {
    flex-direction: column-reverse;
    padding: 1em;
    gap: 1em;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 500px;
  height: 275px;

  @media (max-width: ${MAX_WIDTH}) {
    height: 225px;
    width: 100%;
    max-width: 500px;
  }
`;
