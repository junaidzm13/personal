import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../../../theme/colors';
import { Icon, IconProps } from '../../../common/icons/Icon';

export const ContactDetails: React.FC = () => {
  return (
    <ContactWrapper>
      <span className="email">junaidzmalik7@gmail.com</span>
      <Links>
        {profiles.map((p, idx) => (
          <ProfileSvg key={idx} {...p} />
        ))}
      </Links>
    </ContactWrapper>
  );
};

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
  align-items: center;
  gap: 0.675em;
  height: 100%;

  > a > img {
    height: 3em;
  }
`;

const profiles = [
  {
    icon: 'linkedin',
    href: 'https://linkedin.com/in/junaid-z-malik',
  },
  {
    icon: 'github',
    href: 'https://github.com/junaidzm13?tab=repositorie',
  },
  {
    icon: 'blog',
    href: '/blogs',
    isNew: true,
  },
] as const;

const ProfileSvg: React.FC<{
  icon: IconProps['name'];
  href: string;
  isNew?: boolean;
}> = ({ icon, href, isNew = false }) => (
  <StyledLink to={href}>
    {isNew && <NewBanner />}
    <StyledIcon name={icon} />
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

const StyledIcon = styled(Icon)`
  width: 2.5em;
  height: 2.5em;
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
  background-color: ${colors.GRAY_3};
  border-radius: 0.25em;
  font-size: 0.6125em;
  ${({ color }) => `color: ${color}; border: solid 1px ${color};`};
`;
