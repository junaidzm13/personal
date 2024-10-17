import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';
import { Link } from 'react-router-dom';
import { fromPublic } from '../utils/fromPublic';

export const ContactDetails: React.FC = () => {
  return (
    <ContactWrapper>
      <span className="email">junaidzmalik7@gmail.com</span>
      <Links>
        {profiles.map(p => (
          <ProfileSvg {...p} />
        ))}
      </Links>
    </ContactWrapper>
  );
};

const profiles = [
  {
    src: 'linkedin.svg',
    alt: 'LinkedIn logo',
    href: 'https://linkedin.com/in/junaid-z-malik',
  },
  {
    src: 'github.svg',
    alt: 'GitHub logo',
    href: 'https://github.com/junaidzm13?tab=repositorie',
  },
  {
    src: 'blog.svg',
    alt: 'Blog logo',
    href: '/blogs',
    isNew: true,
  },
] as const;

const ProfileSvg: React.FC<{
  src: string;
  alt: string;
  href: string;
  isNew?: boolean;
}> = ({ src, alt, href, isNew = false }) => (
  <StyledLink to={href}>
    {isNew && <NewBanner />}
    <img src={fromPublic(src)} alt={alt} />
  </StyledLink>
);

const StyledLink = styled(Link)`
  padding-top: 0.5em;
  position: relative;
  text-decoration: none;

  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;

const NewBanner: React.FC = () => {
  const [colorIdx, setColorIdx] = useState<number>(0);

  useEffect(() => {
    const i = setInterval(() => setColorIdx(p => (p + 1) % 3), 500);
    return () => clearInterval(i);
  });

  return (
    <NewBannerWrapper color={newBannerColors[colorIdx]}>
      <span>{'New'}</span>
    </NewBannerWrapper>
  );
};

const newBannerColors = ['#116F11', '#FFD700', '#800020'] as const;

const NewBannerWrapper = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.0675em 0.25em;
  background-color: ${colors.GRAY};
  border-radius: 0.5em;
  ${({ color }) => `color: ${color}; border: solid 1px ${color};`};
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  width: 100%;

  > .email {
    font-weight: bold;
    font-size: 1.125em;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 0.675em;
  height: 100%;

  > a > img {
    height: 3em;
  }
`;
