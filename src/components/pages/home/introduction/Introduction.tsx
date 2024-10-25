import React from 'react';
import styled from 'styled-components';
import { ContactDetails } from './ConactDetails';
import { NameAndSummary } from './NameAndSummary';
import { ProfilePicture } from './ProfilePicture';
import { colors } from '../../../../theme/colors';
import { WIDTH_BOUNDARY_SMALL } from '../../../../constants/layout';

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
  color: ${colors.GRAY_3};
  gap: 3em;
  padding: 3em 1em 3em;

  @media (max-width: ${WIDTH_BOUNDARY_SMALL}) {
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

  @media (max-width: ${WIDTH_BOUNDARY_SMALL}) {
    height: 225px;
    width: 100%;
    max-width: 500px;
  }
`;
