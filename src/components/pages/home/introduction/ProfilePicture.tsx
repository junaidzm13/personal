import React from 'react';
import styled from 'styled-components';
import { fromPublic } from '../../../../utils/fromPublic';
import { colors } from '../../../../theme/colors';
import { FlippingCard } from '../../../common/FlippingCard';

export const ProfilePicture: React.FC = () => {
  return (
    <Wrapper>
      <FlippingCard
        front={<ContentFront className="flipping-card-front" />}
        back={<ContentBack className="flipping-card-back" />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
`;

const ContentFront = styled(({ className }: { className?: string }) => (
  <div className={className}>
    <img src={fromPublic('bitmoji2.jpeg')} alt="Junaid Malik's Bitmoji" />
  </div>
))`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 30em;

  > img {
    height: 100%;
  }
`;

const ContentBack = styled(({ className }: { className?: string }) => (
  <div className={className}>
    <div className="content-back-inner">
      <span className="content-back-greeting">Hola, Junaid here &#128075;</span>
      <span className="content-back-tagline">
        Your friendly neighbourhood <b>Software Engineer</b>! 🕸️
      </span>
    </div>
  </div>
))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.SURFACE_6DP};
  border-radius: 30em;

  & .content-back-inner {
    display: flex;
    flex-direction: column;
    gap: 1em;
    color: ${colors.ON_SURFACE};
    padding: 1em;
  }

  & .content-back-greeting {
    font-size: 1.5em;
    font-weight: bolder;
  }

  & .content-back-tagline {
    font-size: 1.125em;
  }
`;
